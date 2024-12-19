import CustomerManagement from "./Catalog/CustomerManagement"
import DiscountManagement from "./Catalog/DiscountManagement"
import EditEmployee from "./Catalog/EditEmployee"
import EditProduct from "./Catalog/EditProduct"
import EditService from "./Catalog/EditService"
import EmployeeDetails from "./Catalog/EmployeeDetails"
import EmployeeManagement from "./Catalog/EmployeeManagement"
import GiftCardManagement from "./Catalog/GiftCardManagement"
import MerchantManagement from "./Catalog/MerchantManagement"
import OrderDiscountManagement from "./Catalog/OrderDiscountManagement"
import ProductDetails from "./Catalog/ProductDetails"
import ProductManagement from "./Catalog/ProductManagement"
import ServiceDetails from "./Catalog/ServiceDetails"
import ServiceManagement from "./Catalog/ServiceManagement"
import TaxManagement from "./Catalog/TaxManagement"
import Dashboard from "./dashboard"
import LoginPage from "./login-page"
import OrderManagement from "./order-management"
import OrderPage from "./order-page"
import Payment from "./payment"
import PersonalDetails from "./PersonalDetails"
import ReservationManagement from "./reservation-management"
import ReservationPage from "./reservation-page"

const AppRoutes = [
  {
    index: true,
    element: <LoginPage />,
  },
  {
    index: "/personaldetails",
    element: <PersonalDetails />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/ordercreation",
    element: <OrderPage />,
  },
  {
    path: "/reservationcreation",
    element: <ReservationPage />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/ordermanagement",
    element: <OrderManagement />,
  },
  {
    path: "/reservationmanagement",
    element: <ReservationManagement />,
  },
  {
    path: "/taxmanagement",
    element: <TaxManagement />,
  },
  {
    path: "/productmanagement",
    element: <ProductManagement />,
  },
  {
    path: "/product-details/:productId",
    element: <ProductDetails />,
  },
  {
    path: "/edit-product/:productId",
    element: <EditProduct />,
  },
  {
    path: "/servicemanagement",
    element: <ServiceManagement />,
  },
  {
    path: "/service-details/:serviceId",
    element: <ServiceDetails />,
  },
  {
    path: "/edit-service/:serviceId",
    element: <EditService />,
  },
  {
    path: "/employeemanagement",
    element: <EmployeeManagement />,
  },
  {
    path: "/employee-details/:employeeId",
    element: <EmployeeDetails />,
  },
  {
    path: "/edit-employee/:employeeId",
    element: <EditEmployee />,
  },
  {
    path: "/merchantmanagement",
    element: <MerchantManagement />,
  },
  {
    path: "/discountmanagement",
    element: <DiscountManagement />,
  },
  {
    path: "/giftcardmanagement",
    element: <GiftCardManagement />,
  },
  {
    path: "/customermanagement",
    element: <CustomerManagement />,
  },
  {
    path: "/orderdiscountmanagement",
    element: <OrderDiscountManagement />,
  },
]

export default AppRoutes
