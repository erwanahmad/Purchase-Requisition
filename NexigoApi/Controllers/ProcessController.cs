using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using NexigoApi.Models;
using NexigoApi.NextflowService;

namespace NexigoApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ProcessController : ApiController
    {
        private DatabaseProjectDataContext context = null;

        public ProcessController()
        {
            context = new DatabaseProjectDataContext();
        }

        [HttpPost]
        public IHttpActionResult CreateRequestItem([FromBody] RequestProcess req)
        {
            TaskItemResult taskItemResult;
            var errorMessage = string.Empty;

            var nf = new FlowQuestWorkflowServiceClient();
            nf.CreateProcessInstance(8, "ProjectMakers4", req.Requester_ID, out taskItemResult, out errorMessage);

            using (var db = new DatabaseProjectDataContext())
            {
                var data = new Submition()
                {
                    Requester_Name = req.Requester_Name,
                    Requester_ID = req.Requester_ID,
                    CreateDate = DateTime.Now,
                    SubmittedDate = DateTime.Now,
                    Status = "Submit Success",
                    Reviewer_Code = req.Reviewer_Code,
                };
                data.ProcessID = taskItemResult.ProcessId;

                db.Submitions.InsertOnSubmit(data);
                db.SubmitChanges();
            }


            using (var db = new DatabaseProjectDataContext())
            {
                var idManager = db.UserMasters.FirstOrDefault(o => o.StaffID == req.Requester_ID); // For get Id Manager

                var maker = new RequestProcess()
                {
                    Requester_ID = req.Requester_ID,
                    Requester_Name = req.Requester_Name,
                    Requester_Position = req.Requester_Position,
                    Divison = req.Divison,
                    Currency = req.Currency,
                    Expected_Date = req.Expected_Date,
                    Location = req.Location,
                    BudgetSource = req.BudgetSource,
                    Justification = req.Justification,
                    Material_Group = req.Material_Group,
                    Item = req.Item,
                    Description = req.Description,
                    Quantity = req.Quantity,
                    Estimate_Price = req.Estimate_Price,
                    Total_Estimate_Price = req.Total_Estimate_Price,
                    BudgetSources = req.BudgetSources,
                    MaterialPicture = req.MaterialPicture,
                    Reviewer_Code = req.Reviewer_Code,
                    Manager_Code=idManager.Manager_Id,
                    ProcessId = taskItemResult.ProcessId.ToString(),
                    CreatedDate = DateTime.Now.ToString(),
                    SubmittedDate = DateTime.Now.ToString(),
                    Status = "Submit Success By Employee"
                };

                db.RequestProcesses.InsertOnSubmit(maker);
                db.SubmitChanges();

                nf.ExecActionInCurrentActv(8, taskItemResult.ProcessId, "Submit", req.Requester_ID, null, null, "", false, out errorMessage);

            }
            return Ok();
        }

        [HttpPost]
        public IHttpActionResult ApproveRequestItemByReviewer([FromBody]ProcessModel req)
        {
            if (req != null)
            {
                var errorMessage = string.Empty;
                var nf = new FlowQuestWorkflowServiceClient();

                using (var db = new DatabaseProjectDataContext())
                {
                    var data = db.RequestProcesses.Where(o => o.ProcessId== (req.ProcessId)).SingleOrDefault();
                    data.Status = "Submit Accept By Reviewer";

                    nf.ExecActionInCurrentActv(8, int.Parse(data.ProcessId), "AcceptReviewer", data.Reviewer_Code, null, null, "", false, out errorMessage);
                    db.SubmitChanges();
                    return Ok();
                }
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpPost]
        public IHttpActionResult ReviseRequestItemByReviewer([FromBody]ProcessModel req)
        {
            if (req != null)
            {
                var errorMessage = string.Empty;
                var nf = new FlowQuestWorkflowServiceClient();

                using (var db = new DatabaseProjectDataContext())
                {
                    var data = db.RequestProcesses.Where(o => o.ProcessId == (req.ProcessId)).SingleOrDefault();
                    data.Status = "Submit Revise By Reviewer";

                    nf.ExecActionInCurrentActv(8, int.Parse(data.ProcessId), "ReviseReviewer", data.Reviewer_Code, null, null, "", false, out errorMessage);
                    db.SubmitChanges();
                    return Ok();
                }
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpPost]
        public IHttpActionResult SubmitAfterReviseRequestItemByEmployee([FromBody]ProcessModel req)
        {
            if (req != null)
            {
                var errorMessage = string.Empty;
                var nf = new FlowQuestWorkflowServiceClient();

                using (var db = new DatabaseProjectDataContext())
                {
                    var data = db.RequestProcesses.Where(o => o.ProcessId == (req.ProcessId)).SingleOrDefault();
                    data.Status = "Submit After Revise";

                    nf.ExecActionInCurrentActv(8, int.Parse(data.ProcessId), "Submit", data.Requester_ID, null, null, "", false, out errorMessage);
                    db.SubmitChanges();
                    return Ok();
                }
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpPost]
        public IHttpActionResult ApproveRequestItemByManager([FromBody]ProcessModel req)
        {
            if (req != null)
            {
                var errorMessage = string.Empty;
                var nf = new FlowQuestWorkflowServiceClient();

                using (var db = new DatabaseProjectDataContext())
                {
                    var data = db.RequestProcesses.Where(o => o.ProcessId == (req.ProcessId)).SingleOrDefault();
                    data.Status = "Submit Accept By Manager";

                    nf.ExecActionInCurrentActv(8, int.Parse(data.ProcessId), "AcceptManager", data.Manager_Code, null, null, "", false, out errorMessage);
                    db.SubmitChanges();
                    return Ok();
                }
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpPost]
        public IHttpActionResult ApproveRequestItemByOwner([FromBody]ProcessModel req)
        {
            if (req != null)
            {
                var errorMessage = string.Empty;
                var nf = new FlowQuestWorkflowServiceClient();

                using (var db = new DatabaseProjectDataContext())
                {
                    var data = db.RequestProcesses.Where(o => o.ProcessId == (req.ProcessId)).SingleOrDefault();
                    data.Status = "Submit Accept By Owner";

                    nf.ExecActionInCurrentActv(8, int.Parse(data.ProcessId), "AcceptOwner", data.BudgetSource, null, null, "", false, out errorMessage);
                    db.SubmitChanges();
                    return Ok();
                }
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpPost]
        public IHttpActionResult GetCommentHistory([FromBody] string processId)
        {
            var nf = new FlowQuestWorkflowServiceClient();
            CommentHistoryResult[] commentHistoryResult;
            var errorMessage = string.Empty;
            nf.GetCommentHistory(8, int.Parse(processId), 1, 100, out commentHistoryResult, out errorMessage);
            var commentResult = new List<CommentHistoryModel>();

            foreach (var comment in commentHistoryResult)
            {
                if (comment.CompletedDate != null)
                {
                    commentResult.Add(new CommentHistoryModel
                    {
                        Date = comment.StartDate.Value.ToString(),
                        Action = comment.Response,
                        Comment = comment.Comment,
                        Name = comment.UserName
                    });
                }
            }
            return Ok(commentResult);
        }

        [HttpPost]
        public IHttpActionResult GetCurrentAtivityUser([FromBody]string processId)
        {
            var nf = new FlowQuestWorkflowServiceClient();
            LastActivity[] lastActivity;
            var errorMessage = string.Empty;

            nf.GetLastActivityWithParticipant(8,processId,out lastActivity, out errorMessage);
            var lastAct = new LastActivityModel();
            lastAct.ActivityName = lastActivity[0].ActivityName;
            lastAct.Participant = lastActivity[0].Participant;

            return Ok(lastAct);
        }
    }
}
