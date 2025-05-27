using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace BeanBarAPI.DTOs
{
    public class AuditLogDTO
    {
        public int LogID { get; set; }
        public string TableAffected { get; set; }
        public string ActionPerformed { get; set; }
        public string PerformedBy { get; set; }
        public DateTime AuditTimestamp { get; set; }
    }

}
