using Shopping.Api.Models;

namespace Shopping.Api.Interfaces.IRepositories
{
    public interface IOrderRepository
    {
        public Task<List<Order>> History(int id);
        public Task<Order> Create(Order newOrder);
        public Task<List<Order>> AllOrders();
        public Task UpdateStatus();
        public Task<List<Order>> GetActiveOrders(int id);
        public Task<bool> CancelOrder(int orderId, int userId);
    }
}
