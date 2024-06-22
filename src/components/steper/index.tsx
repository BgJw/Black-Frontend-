import { Stepper, Step, CardHeader } from "@material-tailwind/react";
import { useEffect, useState } from "react";
 

interface IStepper {
    step: number,
    error: boolean,
}

export const StepperWithDots = ({step, error}: IStepper) =>  {
  const [activeStep, setActiveStep] = useState(step);
 
  useEffect( () => {
    setActiveStep(step)
  }, [step, error]);
  
  return (
    <div className="w-full">
      <CardHeader floated={false} variant="gradient" color="gray" className="grid h-12 m-0 place-items-center">
        <div className="w-full md:px-20 px-12 pt-4 pb-8">
          <Stepper
            activeStep={activeStep}
            lineClassName="bg-gray-200"
            activeLineClassName="bg-green-400"
          >
            <Step
              className="h-4 w-4 bg-gray-200 text-white/75 cursor-pointer"
              activeClassName={`${error? 'bg-red-400' : 'bg-green-600'} ring-0 text-white`}
              completedClassName="bg-green-200 text-white"
            >
            </Step>
            <Step
              className="h-4 w-4 bg-gray-200 text-white/75 cursor-pointer"
              activeClassName={`ring-0 bg-green-600 text-white`}
              completedClassName="bg-gray-200 text-white"
            >
            </Step>

          </Stepper>
        </div>
      </CardHeader>
    </div>
  );
}