using api.Dtos.GiftCard;
using api.Models;
using AutoMapper;

namespace api.MappingProfiles
{
    public class GiftCardMappingProfile : Profile
    {
        public GiftCardMappingProfile()
        {
            CreateMap<CreateGiftCardDto, GiftCard>();
            CreateMap<UpdateGiftCardDto, GiftCard>();
            CreateMap<GiftCard, GiftCardDto>();           
        }
    }
}