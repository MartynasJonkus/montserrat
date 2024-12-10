using api.Dtos.Merchant;
using api.Interfaces.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/merchants")]
    public class MerchantController : ControllerBase
    {
        private readonly IMerchantService _merchantService;
        private readonly IMapper _mapper;

        public MerchantController(IMapper mapper, IMerchantService merchantService)
        {
            _mapper = mapper;
            _merchantService = merchantService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMerchant(int id)
        {
            var merchant = await _merchantService.GetMerchantAsync(id);
            if (merchant == null)
                return NotFound(new { message = "Merchant not found" });

            var merchantDto = _mapper.Map<MerchantDto>(merchant);
            return Ok(merchantDto);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMerchants()
        {
            var merchants = await _merchantService.GetAllMerchantsAsync();
            var merchantDtos = _mapper.Map<IEnumerable<MerchantDto>>(merchants);
            return Ok(merchantDtos);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMerchant([FromBody] CreateMerchantDto createMerchantDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdMerchant = await _merchantService.CreateMerchantAsync(createMerchantDto);
            var merchantDto = _mapper.Map<MerchantDto>(createdMerchant);
            return CreatedAtAction(nameof(GetMerchant), new { id = createdMerchant.Id }, merchantDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMerchant(int id, [FromBody] UpdateMerchantDto updateMerchantDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var merchant = await _merchantService.UpdateMerchantAsync(id, updateMerchantDto);
                var merchantDto = _mapper.Map<MerchantDto>(merchant);
                return Ok(merchantDto);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
    }
}
