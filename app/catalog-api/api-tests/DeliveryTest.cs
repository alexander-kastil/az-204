using System.Reflection;
using System;
using Xunit;
using FoodApi;

namespace FoodApiTests
{
    public class DeliveryTest
    {
        private readonly Delivery delivery;

        public DeliveryTest(){
            delivery = new Delivery();
        }

        [Fact]
        public void CalaculatesDeliveryRate()
        {
            var result = delivery.getDeliveryCost(100);
            Assert.True(result == 23);
        }
    }
}
