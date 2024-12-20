import { FC} from "react";
import { Header } from "@/components/createOrder/header";
import MainContent from "@/components/createOrder/mainContent";



const Orders: FC = () => {
  
      
  return (
    <div className="w-full relative mb-2">
      <Header />
      <MainContent />
    </div>
  )
};

export default Orders;