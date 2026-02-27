using System.Data.Common;

namespace SRManAdd_Backend
{
    public class ManAdd
    {
        public int Id { get; set; }
        public int? PhaseID { get; set; }
        public string? PhaseName { get; set; }
        public int? MaterialID { get; set; }
        //public Material material { get; set }
        public string? MaterialName { get; set; }
        public float? TargetAmount { get; set; }
        public float? ActualAmount { get; set; }
        public DateTime? StartDateTime { get; set; }
        public DateTime? EndDateTime { get; set; }
        public string? RegisteredBy { get; set; }
        public int? PLCWorkID { get; set; }
        public string? RegistrationStatus { get; set; }
        public string? EquipmentName { get; set; }
    }

    public class ManAddLot
    {
        public int Id { get; set; }
        public int ManAdds_Registration_Id { get; set; }
        public float? ActualAmount { get; set; }
        public DateTime? LastUpdateAt { get; set; }
        public string? RegisteredBy { get; set; }
        public string? LotId { get; set; }
    }

    public class LotValidation
    {
        public string? TemplateName { get; set; }
        public string? BarCode1 { get; set; }
        public string? BarCode2 { get; set; }
        public string? BarCode3 { get; set; }
        public string? MaterialId { get; set; }
        public bool? MaterialValidation { get; set; }
    }

    public class ValidationResponse
    {
        public string? LotId { get; set; }
        public string? ExpirationDate { get; set; }
        public string? Quantity { get; set; }
        public string? MaterialID { get; set; }
        public string? Par2 { get; set; }
        public string? Par3 { get; set; }
        public string? Par4 { get; set; }
        public string? Par5 { get; set; }
        public string? Par6 { get; set; }
        public string? Par7 { get; set; }
        public string? Par8 { get; set; }
        public string? Par9 { get; set; }
        public string? Par10 { get; set; }
        public string? Result { get; set; }
        public string? Validation { get; set; }
    }

    public class LabelTemplate
    {
        public int Id { get; set; }
        public string TemplateName { get; set; } = string.Empty;
        public string BarCode1 { get; set; } = string.Empty;
        public string BarCode2 { get; set; } = string.Empty;
        public string BarCode3 { get; set; } = string.Empty;
        public string LotId { get; set; } = string.Empty;
        public string ExpirationDate { get; set; } = string.Empty;
        public string Quantity { get; set; } = string.Empty;
        public string Par1 { get; set; } = string.Empty;
        public string Par2 { get; set; } = string.Empty;
        public string Par3 { get; set; } = string.Empty;
        public string Par4 { get; set; } = string.Empty;
        public string Par5 { get; set; } = string.Empty;
        public string Par6 { get; set; } = string.Empty;
        public string Par7 { get; set; } = string.Empty;
        public string Par8 { get; set; } = string.Empty;
        public string Par9 { get; set; } = string.Empty;
        public string Par10 { get; set; } = string.Empty;
        public DateTime LastUpdateAt { get; set; }
        public string UpdatedBy { get; set; } = string.Empty;
        public bool isActive { get; set; }

    }

    public class ManAddUser
    {
        public int Id { get; set; }
        public string? UserName { get; set; }
    }

    public class ManAddReport
    {
        public int Id { get; set; }
        public string? PhaseName { get; set; }
        public string? MaterialName { get; set; }
        public float? TargetAmount { get; set; }
        public float? TotalQuantity { get; set; }
        public DateTime? RegStartDateTime { get; set; }
        public DateTime? RegEndDateTime { get; set; }
        public string? EquipmentName { get; set; }
        public int? Lot_Id { get; set; }
        public string? Lot_LotId { get; set; }
        public float? Lot_ActualAmount { get; set; }
        public DateTime? Lot_RegisteredDateTime { get; set; }
        public string? Lot_RegisteredBy { get; set; }
    }
}
