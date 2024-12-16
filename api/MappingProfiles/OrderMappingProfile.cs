using api.Dtos.Order;
using api.Models;
using AutoMapper;

namespace api.MappingProfiles
{
    public class OrderMappingProfile : Profile
    {
        public OrderMappingProfile()
        {
            CreateMap<CreateOrderItemDto, OrderItem>();
            CreateMap<OrderItem, OrderItemDto>();

            CreateMap<CreateOrderDto, Order>();
            CreateMap<Order, OrderDto>()
                .ForMember(dest => dest.OrderItems, opt => opt.MapFrom(src => src.OrderItems));

            CreateMap<CreateUpdateOrderDiscountDto, OrderDiscount>();
            CreateMap<OrderDiscount, OrderDiscountDto>();
        }
    }
}