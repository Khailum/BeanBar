using System;

namespace BeanBar_Back_end.Models
{
    public class AuditLog
    {
        public int LogID { get; set; }
        public string TableAffected { get; set; }
        public string ActionPerformed { get; set; }
        public string PerformedBy { get; set; }
        public DateTime AuditTimestamp { get; set; }
    }

}
