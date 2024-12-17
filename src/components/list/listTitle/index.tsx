import { Typography } from "@material-tailwind/react/components/Typography";

const LIST_HEAD = ['№', 'Data przyjęcia', 'Co przyjęte', 'Nr klienta', 'Kto przyjąl', 'Kwota', 'Status opłaty', 'Kto zrobił', 'Godzina'];

const ListTitle = () => {
    return (
      <thead >
            <tr>
              {LIST_HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
      </thead>
    );
};

export default ListTitle;