using api.Dtos.Reservation;
using api.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/reservations")]
    public class ReservationsController : ControllerBase
    {
        private readonly IReservationService _reservationService;
        private readonly IReceiptService _receiptService;

        public ReservationsController(IReservationService reservationService, IReceiptService receiptService)
        {
            _reservationService = reservationService;
            _receiptService = receiptService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateReservation([FromBody] CreateReservationDto createReservationDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var reservation = await _reservationService.CreateReservationAsync(createReservationDto);
            return CreatedAtAction(nameof(GetReservation), new { reservationId = reservation.Id }, reservation);
        }

        [HttpGet]
        public async Task<IActionResult> GetReservations()
        {
            var reservations = await _reservationService.GetReservationsAsync();
            return Ok(reservations);
        }

        [HttpGet("{reservationId}")]
        public async Task<IActionResult> GetReservation([FromRoute] int reservationId)
        {
            var reservation = await _reservationService.GetReservationByIdAsync(reservationId);
            if (reservation == null)
                return NotFound(new { message = "Reservation not found" });

            return Ok(reservation);
        }

        [HttpPut("{reservationId}")]
        public async Task<IActionResult> UpdateReservation([FromRoute] int reservationId, [FromBody] UpdateReservationDto updateReservationDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updatedReservation = await _reservationService.UpdateReservationAsync(reservationId, updateReservationDto);
            if (updatedReservation == null)
                return NotFound(new { message = "Reservation not found" });

            return Ok(updatedReservation);
        }

        [HttpDelete("{reservationId}")]
        public async Task<IActionResult> DeleteReservation([FromRoute] int reservationId)
        {
            var deleted = await _reservationService.DeleteReservationAsync(reservationId);
            if (!deleted)
                return NotFound(new { message = "Reservation not found" });

            return NoContent();
        }

        [HttpGet("{reservationId}/receipt")]
        public async Task<IActionResult> GetReceiptByReservationId(int reservationId)
        {
            var merchantIdClaim = User.FindFirst("MerchantId");
            if (merchantIdClaim == null || !int.TryParse(merchantIdClaim.Value, out var merchantId))
            {
                return Unauthorized("MerchantId is missing or invalid in the token.");
            }

            var receipt = await _receiptService.GetReceiptByReservationIdAsync(merchantId, reservationId);
            if (receipt == null)
                return NotFound(new { message = "Receipt not found for the reservation" });

            return Ok(receipt);
        }
    }
}