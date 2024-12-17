using api.Dtos.Service;
using api.Interfaces.Repositories;
using api.Interfaces.Services;
using api.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace api.Services
{
    public class ServiceService : IServiceService
    {
        private readonly IServiceRepository _serviceRepository;
        private readonly IMapper _mapper;

        public ServiceService(IServiceRepository serviceRepository, IMapper mapper)
        {
            _serviceRepository = serviceRepository;
            _mapper = mapper;
        }

        public async Task<ServiceDto> CreateServiceAsync(int merchantId, CreateServiceDto createServiceDto)
        {
            var service = _mapper.Map<Service>(createServiceDto);
            service.MerchantId = merchantId;
            await _serviceRepository.AddAsync(service);
            return _mapper.Map<ServiceDto>(service);
        }

        public async Task<IEnumerable<ServiceDto>> GetServicesAsync(int merchantId, string? category, int limit)
        {
            var services = await _serviceRepository.GetServicesAsync(merchantId, category, limit);
            return _mapper.Map<IEnumerable<ServiceDto>>(services);
        }

        public async Task<ServiceDto?> GetServiceAsync(int serviceId)
        {
            var service = await _serviceRepository.GetByIdAsync(serviceId);
            return _mapper.Map<ServiceDto>(service);
        }

        public async Task<ServiceDto?> UpdateServiceAsync(int serviceId, UpdateServiceDto updateServiceDto)
        {
            var service = await _serviceRepository.GetByIdAsync(serviceId);
            if (service == null)
                return null;

            _mapper.Map(updateServiceDto, service);
            await _serviceRepository.UpdateAsync(service);
            return _mapper.Map<ServiceDto>(service);
        }

        public async Task<bool> DeleteServiceAsync(int serviceId)
        {
            var service = await _serviceRepository.GetByIdAsync(serviceId);
            if (service == null)
                return false;

            await _serviceRepository.DeleteAsync(service);
            return true;
        }

        public async Task<IEnumerable<DateTime>> CheckAvailableTimesAsync(int serviceId, DateTime date)
        {
            return await _serviceRepository.CheckAvailableTimesAsync(serviceId, date);
        }
    }
}