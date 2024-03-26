import { useAppSelector } from "@/components/hooks/store";
import dynamic from "next/dynamic";



const DynamicTooltipWithHelperIcon = dynamic(() => import('../tooltip/TooltipForEmployee'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
export const WorkHeader = () => {
  const employees = useAppSelector( (store) => store.scheduleSlice.personel.employees);

  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
                  Data / Pracownik
          </th>
          {
          employees.map(emplo => (
                  <th scope="col" className="px-6 py-3 relative" key={emplo._id}>
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
