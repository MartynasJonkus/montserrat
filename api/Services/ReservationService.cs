using api.Dtos.Reservation;
using api.Interfaces.Repositories;
using api.Interfaces.Services;
using api.Models;
using AutoMapper;

namespace api.Services
{
    public class ReservationService : IReservationService
    {
        private readonly IReservationRepository _reservationRepository;
        private readonly ICustomerRepository _customerRepository;
        private readonly IServiceRepository _serviceRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IMapper _mapper;

        public ReservationService(IReservationRepository reservationRepository,
                                  ICustomerRepository customerRepository,
                                  IServiceRepository serviceRepository,
                                  IEmployeeRepository employeeRepository,
                                  IMapper mapper)
        {
            _reservationRepository = reservationRepository;
            _customerRepository = customerRepository;
            _serviceRepository = serviceRepository;
            _employeeRepository = employeeRepository;
            _mapper = mapper;
        }

        public async Task<ReservationDto> CreateReservationAsync(CreateReservationDto createReservationDto)
        {
            var reservation = _mapper.Map<Reservation>(createReservationDto);
            await _reservationRepository.AddAsync(reservation);
            return _mapper.Map<ReservationDto>(reservation);
        }

        public async Task<IEnumerable<ReservationDto>> GetReservationsAsync()
        {
            var reservations = await _reservationRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<ReservationDto>>(reservations);
        }

        public async Task<ReservationDto?> GetReservationAsync(int reservationId)
        {
            var reservation = await _reservationRepository.GetByIdAsync(reservationId);
            return _mapper.Map<ReservationDto>(reservation);
        }

        public async Task<ReservationDto?> UpdateReservationAsync(int reservationId, UpdateReservationDto updateReservationDto)
        {
            var reservation = await _reservationRepository.GetByIdAsync(reservationId);
            if (reservation == null)
                return null;

            _mapper.Map(updateReservationDto, reservation);
            await _reservationRepository.UpdateAsync(reservation);
            return _mapper.Map<ReservationDto>(reservation);
        }

        public async Task<bool> DeleteReservationAsync(int reservationId)
        {
            var reservation = await _reservationRepository.GetByIdAsync(reservationId);
            if (reservation == null)
                return false;

            await _reservationRepository.DeleteAsync(reservation);
            return true;
        }

        public async Task<IEnumerable<ReservationDto>> GetReservationsByCustomerIdAsync(int customerId)
        {
            var reservations = await _reservationRepository.GetReservationsByCustomerIdAsync(customerId);
            return _mapper.Map<IEnumerable<ReservationDto>>(reservations);
        }
    }
}