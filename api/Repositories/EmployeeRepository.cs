using api.Data;
using api.Enums;
using api.Interfaces.Repositories;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly ApplicationDbContext _context;

        public EmployeeRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        
        public async Task<Employee?> GetEmployeeByIdAsync(int id)
        {
            return await _context.Employees
                .FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<Employee?> GetEmployeeByUsernameAsync(string username)
        {
            return await _context.Employees.FirstOrDefaultAsync(e => e.Username == username && e.Status == Status.active);
        }

        public async Task<IEnumerable<Employee>> GetAllEmployeesAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize)
        {
            var query = _context.Employees
                .AsQueryable();

            if (employeeType != EmployeeType.admin)
            {
                query = query.Where(c => c.MerchantId == merchantId);
            }

            return await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task AddEmployeeAsync(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateEmployeeAsync(Employee employee)
        {
            _context.Employees.Update(employee);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteEmployeeAsync(Employee employee)
        {
            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
        }
    }
}