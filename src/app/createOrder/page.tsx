
import { FC} from "react";
import { Header } from "@/components/createOrder/header";
import Notification from "@/components/notification";
import MainContent from "@/components/createOrder/mainContent";



const Orders: FC = () => {
  
      
  return (
    <div className="w-full relative mb-2">
      <Header />
      <MainContent />
      <Notification />
    </div>
  )
};

export default Orders;