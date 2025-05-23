import { fetchClientNumber, ISelectedItem, PaidMethod } from '../app/api/order/index';
import { useCallback, useState, useEffect } from 'react';

const initialDate = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;

export const useOrderState = () => {
  const [nextStep, setNextStep] = useState(0);
  const [error, setError] = useState(false);
  const [selectedItems, setSelectedItems] = useState<ISelectedItem[]>([]);
  const [customerData, setCustomerData] = useState({
    customerNumber: "",
    dateReceived: initialDate,
    hour: "",
    forWhen: "",
    receivedBy: "",
    amountToPay: "",
    cardOrCash: "" as PaidMethod,
  });

  const updateField = useCallback(
    (field: keyof typeof customerData, value: any) => {
      setCustomerData((prev) => ({ ...prev, [field]: value }));
    },[]);

  const resetAll = useCallback(async () => {
    setNextStep(0);
    setSelectedItems([]);
    setCustomerData({
      customerNumber: "",
      dateReceived: initialDate,
      hour: "",
      forWhen: "",
      receivedBy: "",
      amountToPay: "",
      cardOrCash: "" as PaidMethod,
    });

    try {
      const numb = await fetchClientNumber();
      updateField("customerNumber", String(numb).padStart(3, "0"));
    } catch (error) {
      console.error("Error fetching client number:", error);
    }
  }, [updateField]);

  const handleNextStep = useCallback(() => {
    if (nextStep === 0 && selectedItems.length === 0) {
      setError(true);
      return;
    }
    setError(false);
    setNextStep(nextStep + 1);
  }, [nextStep, selectedItems]);

  const handlePrevStep = useCallback(() => {
    setNextStep(nextStep - 1);
  }, [nextStep]);

  useEffect(() => {
    fetchClientNumber()
      .then((numb) => updateField("customerNumber", String(numb).padStart(3, "0")))
      .catch((error) => console.error("Error fetching client number:", error));
  }, [selectedItems.length, updateField]);

  return {
    nextStep,
    error,
    selectedItems,
    setSelectedItems,
    customerData,
    updateField,
    resetAll,
    handleNextStep,
    handlePrevStep,
  };
};
