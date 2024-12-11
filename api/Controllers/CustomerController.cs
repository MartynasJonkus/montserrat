using api.Dtos.Customer;
using api.Interfaces.Services;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/customer")]
    [ApiController]
    public class CustomerController : ControllerBase
       {
        private readonly ICustomerService _customerService;
        private readonly IMapper _mapper;
        public CustomerController(IMapper mapper, ICustomerService customerService)
        {
            _mapper = mapper;
            _customerService = customerService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomer(int id)
        {
            var customer = await _customerService.GetCustomerAsync(id);
            if (customer == null)
                return NotFound(new { message = "Customer not found" });

            var customerDto = _mapper.Map<CustomerDto>(customer);
            return Ok(customerDto);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCustomers()
        {
            var customers = await _customerService.GetAllCustomersAsync();
            var customersDtos = _mapper.Map<IEnumerable<CustomerDto>>(customers);
            return Ok(customersDtos);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCustomer([FromBody] CreateUpdateCustomerDto createUpdateCustomerDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdCustomer = await _customerService.CreateCustomerAsync(createUpdateCustomerDto);
            var customerDto = _mapper.Map<CustomerDto>(createdCustomer);
            return CreatedAtAction(nameof(GetCustomer), new { id = createdCustomer.Id }, customerDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCustomer(int id, [FromBody] CreateUpdateCustomerDto createUpdateCustomerDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var customer = await _customerService.UpdateCustomerAsync(id, createUpdateCustomerDto);
                var customerDto = _mapper.Map<CustomerDto>(customer);
                return Ok(customerDto);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
    }
}