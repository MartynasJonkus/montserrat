using api.Dtos.Payment;
using api.Models;
using AutoMapper;

namespace api.MappingProfiles
{
    public class PaymentMappingProfile : Profile
    {
        public PaymentMappingProfile()
        {
            CreateMap<CreatePaymentDto, Payment>();
            CreateMap<Payment, PaymentDto>();

            CreateMap<CreateRefundDto, Refund>();
            CreateMap<Refund, RefundDto>();
        }
    }
}