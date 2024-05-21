import { useAppSelector } from "@/components/hooks/store";
import dynamic from "next/dynamic";



const DynamicTooltipWithHelperIcon = dynamic(() => import('../tooltip/TooltipForEmployee'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});


export const WorkHeader = () => {
  const employees = useAppSelector( (store) => store.scheduleSlice.personel.employees);

  return (
    <thead className="text-xs text-white md:uppercase normal-case bg-gray-700">
        <tr>
          <th scope="col" className="md:px-6 px-3 md:py-3 py-2">
                  Data / Pracownik
          </th>
          {
         employees && employees.map(emplo => (
                  <th scope="col" className="md:px-6 px-3 md:py-3 py-2 relative" key={emplo._id}>
                      {
                          emplo.name
                      }
                      <DynamicTooltipWithHelperIcon employee={emplo} />
                  </th>
          ))
          }
        </tr>
    </thead>
  )
}
