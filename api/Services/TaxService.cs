using api.Dtos.Tax;
using api.Enums;
using api.Interfaces.Repositories;
using api.Interfaces.Services;
using api.Models;
using AutoMapper;

namespace api.Services
{
        public class TaxService : ITaxService
    {
        private readonly ITaxRepository _taxRepository;
        private readonly IMapper _mapper;
        public TaxService(ITaxRepository taxRepository, IMapper mapper)
        {
            _taxRepository = taxRepository;
            _mapper = mapper;
        }

        public async Task<TaxDto> GetTaxByIdAsync(int id)
        {
            var tax = await _taxRepository.GetTaxByIdAsync(id);
            return _mapper.Map<TaxDto>(tax);
        }

        public async Task<IEnumerable<TaxDto>> GetAllTaxesAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize)
        {
            var taxes = await _taxRepository.GetAllTaxesAsync(merchantId, employeeType, pageNumber, pageSize);
            return _mapper.Map<IEnumerable<TaxDto>>(taxes);
        }

        public async Task<TaxDto> CreateTaxAsync(int merchantId, CreateUpdateTaxDto createTaxDto)
        {
            var tax = _mapper.Map<Tax>(createTaxDto);
            tax.MerchantId = merchantId;

            await _taxRepository.AddTaxAsync(tax);
            return _mapper.Map<TaxDto>(tax);
        }

        public async Task<Tax> UpdateTaxAsync(int id, CreateUpdateTaxDto updatedTax)
        {
            var existingTax = await _taxRepository.GetTaxByIdAsync(id);
            if (existingTax == null)
                throw new KeyNotFoundException("Tax not found.");

            _mapper.Map(updatedTax, existingTax);
            await _taxRepository.UpdateTaxAsync(existingTax);
            return existingTax;  
        }
        
        public async Task<bool> DeleteTaxAsync(int id)
        {
            var existingTax = await _taxRepository.GetTaxByIdAsync(id);
            if (existingTax == null)
                return false;

            await _taxRepository.DeleteTaxAsync(existingTax);
            return true;
        }
    }
}