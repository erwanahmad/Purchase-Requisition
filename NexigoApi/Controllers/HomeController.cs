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
    public class GetList
    {
        public List<ProcessModel> data { get; set; }
        public int total { get; set; }
    }

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class HomeController : ApiController
    {
        private DatabaseProjectDataContext context = null;

        public HomeController()
        {
            context = new DatabaseProjectDataContext();
        }

        [HttpPost]
        public GetList ReadItemAll(string Id)
        {
            var user = (from a_data in context.UserMasters where a_data.StaffID.Equals(Id) select a_data).SingleOrDefault()  ;
            
            if (user.Staff_Level==1)
            {
                var query = from a_item in context.RequestProcesses where (user.StaffID == a_item.BudgetSource && a_item.Status== "Accept By Manager")
                            select new ProcessModel
                            {
                                Id = a_item.Id,
                                ProcessId = a_item.ProcessId,
                                Requester_ID = a_item.Requester_ID,
                                Requester_Name = a_item.Requester_Name,
                                Requester_Position = a_item.Requester_Position,
                                Divison = a_item.Divison,
                                Currency = a_item.Currency,
                                Expected_Date = (a_item.Expected_Date),
                                Location = a_item.Location,
                                BudgetSource = a_item.BudgetSource,
                                Justification = a_item.Justification,
                                Material_Group = a_item.Material_Group,
                                Item = a_item.Item,
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
                GetList getList = new GetList
                {
                    data = query.ToList(),
                    total = query.ToList().Count
                };
                return getList;
            }
            else if (user.Staff_Level==2)
            {
                var query = from a_item in context.RequestProcesses
                            where (user.StaffID == a_item.Manager_Code && a_item.Status == "Accept By Reviewer")
                            select new ProcessModel
                            {
                                Id = a_item.Id,
                                ProcessId = a_item.ProcessId,
                                Requester_ID = a_item.Requester_ID,
                                Requester_Name = a_item.Requester_Name,
                                Requester_Position = a_item.Requester_Position,
                                Divison = a_item.Divison,
                                Currency = a_item.Currency,
                                Expected_Date = (a_item.Expected_Date),
                                Location = a_item.Location,
                                BudgetSource = a_item.BudgetSource,
                                Justification = a_item.Justification,
                                Material_Group = a_item.Material_Group,
                                Item = a_item.Item,
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
                GetList getList = new GetList
                {
                    data = query.ToList(),
                    total = query.ToList().Count
                };
                return getList;
            }
            else if (user.Staff_Level == 3)
            {
                var query = from a_item in context.RequestProcesses
                            where (user.StaffID == a_item.Reviewer_Code && (a_item.Status == "Submit Success By Employee" || a_item.Status == "Submit After Revise"))
                            select new ProcessModel
                            {
                                Id = a_item.Id,
                                ProcessId = a_item.ProcessId,
                                Requester_ID = a_item.Requester_ID,
                                Requester_Name = a_item.Requester_Name,
                                Requester_Position = a_item.Requester_Position,
                                Divison = a_item.Divison,
                                Currency = a_item.Currency,
                                Expected_Date = (a_item.Expected_Date),
                                Location = a_item.Location,
                                BudgetSource = a_item.BudgetSource,
                                Justification = a_item.Justification,
                                Material_Group = a_item.Material_Group,
                                Item = a_item.Item,
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

                GetList getList = new GetList
                {
                    data = query.ToList(),
                    total = query.ToList().Count
                };
                return getList;
            }
            else 
            {
                var query = from a_item in context.RequestProcesses
                            where (user.StaffID == a_item.Requester_ID )
                            select new ProcessModel
                            {
                                Id = a_item.Id,
                                ProcessId = a_item.ProcessId,
                                Requester_ID = a_item.Requester_ID,
                                Requester_Name = a_item.Requester_Name,
                                Requester_Position = a_item.Requester_Position,
                                Divison = a_item.Divison,
                                Currency = a_item.Currency,
                                Expected_Date = (a_item.Expected_Date),
                                Location = a_item.Location,
                                BudgetSource = a_item.BudgetSource,
                                Justification = a_item.Justification,
                                Material_Group = a_item.Material_Group,
                                Item = a_item.Item,
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

                GetList getList = new GetList
                {
                    data = query.ToList(),
                    total = query.ToList().Count
                };
                return getList;
            }
            
            

        }
    }
}
