using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using NexigoApi.Models;

namespace NexigoApi.Controllers
{
    public class GetItem
    {
        public List<SelectRequest> data { get; set; }
        public int total { get; set; }
    }

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class RequestController : ApiController
    {
        [HttpGet]
        public string GetText()
        {
            return "IDR";
        }
        
        private DatabaseProjectDataContext context = null;

        public RequestController()
        {
            context = new DatabaseProjectDataContext();
        }

        [HttpPost]
        public List<SelectModel> GetLocation()
        {
            var select1 = new SelectModel
            { text = "First Floor", value = "First Floor", };

            var select2 = new SelectModel
            { text = "Second Floor", value = "First Floor", };

            var select3 = new SelectModel
            { text = "Third Floor", value = "First Floor", };

            var select4 = new SelectModel
            { text = "Fourt Floor", value = "First Floor", };

            var GetLocDDList = new List<SelectModel>();
            GetLocDDList.Add(select1);
            GetLocDDList.Add(select2);
            GetLocDDList.Add(select3);
            GetLocDDList.Add(select4);

            return GetLocDDList;
        }

        public IHttpActionResult MaterialGroupList()
        {
            var result = new List<SelectResult>();
            using (var dc = new DatabaseProjectDataContext())
            {
                var comp = dc.Material_Groups.Where(o => o.Id != 8).ToList();

                foreach (var m in comp)
                {
                    result.Add(new SelectResult()
                    {
                        text = m.Name,
                        value = m.Id.ToString(),
                    });
                }
            }
            return Ok(result);
        }

        public IHttpActionResult ReviewerList()
        {
            var result = new List<SelectResult>();
            using (var dc = new DatabaseProjectDataContext())
            {
                var comp = dc.Reviewers.Where(o => o.Id != 8).ToList();

                foreach (var m in comp)
                {
                    result.Add(new SelectResult()
                    {
                        text = m.Name_Reviewer,
                        value = m.Reviewer_Id.ToString(),
                    });
                }
            }
            return Ok(result);
        }

        public IHttpActionResult ItemList()
        {
            var result = new List<SelectResult>();
            using (var dc = new DatabaseProjectDataContext())
            {
                var comp = dc.Materials.Where(o => o.Id != 80).ToList();

                foreach (var m in comp)
                {
                    result.Add(new SelectResult()
                    {
                        text = m.Name,
                        value = m.Id.ToString(),
                    });
                }
            }
            return Ok(result);
        }

        [HttpGet]
        public IHttpActionResult MaterialListItem(int Id)
        {
            var result = new List<SelectResult>();
            using (var dc = new DatabaseProjectDataContext())
            {
                var comp = dc.Materials.Where(o => o.Group_Id == Id).ToList();
                foreach (var m in comp)
                {
                    result.Add(new SelectResult()
                    {
                        text = m.Name,
                        value = m.Id.ToString(),
                    });
                }
            }
            return Ok(result);
        }

        [HttpGet]
        public IHttpActionResult GetData(string ProcessId)
        {
            var material_item = (from a_item in context.RequestProcesses where a_item.ProcessId.Equals(ProcessId) select a_item).SingleOrDefault();
            var material = (from item in context.Material_Groups where item.Id == int.Parse(material_item.Material_Group) select item.Name).SingleOrDefault();
            var items = (from item in context.Materials where item.Id == int.Parse(material_item.Item) select item.Name).SingleOrDefault();
            var query = from a_item in context.RequestProcesses
                        where a_item.ProcessId.Equals(ProcessId)
                        select new ProcessModel
                        {
                            ProcessId = a_item.ProcessId,
                            Id =a_item.Id,
                            Requester_ID = a_item.Requester_ID,
                            Requester_Name = a_item.Requester_Name,
                            Requester_Position=a_item.Requester_Position,
                            Divison = a_item.Divison,
                            Currency = a_item.Currency,
                            Expected_Date = a_item.Expected_Date,
                            Location = a_item.Location,
                            BudgetSource = a_item.BudgetSource,
                            Justification = a_item.Justification,
                            Material_Group = material,
                            Item = items,
                            Description = a_item.Description,
                            Quantity = a_item.Quantity,
                            Estimate_Price = a_item.Estimate_Price,
                            Total_Estimate_Price = a_item.Total_Estimate_Price,
                            BudgetSources = a_item.BudgetSources,
                            MaterialPicture = a_item.MaterialPicture,
                            CreatedDate = (a_item.CreatedDate),
                            SubmittedDate = (a_item.SubmittedDate),
                            Status = a_item.Status,
                            Manager_Code = a_item.Manager_Code,
                            Reviewer_Code = a_item.Reviewer_Code,
                        };
            return Ok(query.ToList()[0]);
        }

        [HttpGet]
        public IHttpActionResult getNameOwner(int Id)
        {
            var result = new List<SelectResult>();

            var comp = from a_data in context.Budget_Sources
                       where a_data.Owner_Id.Equals(Id)
                       select a_data.Owner;
                //dc.Materials.Where(o => o.Group_Id == Id).ToList();
            return Ok(comp);
        }
    }
}



//using (var dc = new DatabaseProjectDataContext())
//{
//    List<MaterialModel> materialList = new List<MaterialModel>();

//var comp = (from a_M in context.Materials
//            join a_MG in context.Material_Groups
//            on a_M.Group_Id equals a_MG.Id
//            where a_M.Group_Id.Equals(material)
//            select new MaterialModel
//            {
//                Group_Name = a_M.Name
//            });

//    materialList = comp.ToList();

//foreach (var m in materialList)
//{
//    result.Add(new SelectResult()
//    {
//        text = m.Name,
//        value = m.ID.ToString(),
//    });
//}
//}
//return Ok(result);