import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useGetAllUsersQuery } from '../redux/auth/AuthApi';

const Users = () => {
  const { data: allUsers } = useGetAllUsersQuery();


  return (
<div className="overflow-hidden rounded-xl shadow-md">
  <table className="w-full table-auto font-sans bg-[#BDB5B530] min-h-[450px]">
    <thead className="text-[#1E1E1E]">
      <tr>
        <th className="p-3 font-[600] align-top text-start">Customer Name</th>
        <th className="p-3 font-[600] align-top text-start">Contact No</th>
        <th className="p-3 font-[600] align-top text-start">Email</th>
        <th className="p-3 font-[600] align-top text-start">Registration Date & Time</th>
        <th className="p-3 font-[600] align-top text-start">Action</th>
      </tr>
    </thead>
    <tbody className="bg-white text-start">
      {allUsers && allUsers.map((customer, id) => (
        <tr key={id} className="hover:bg-gray-50 text-[#919191]">
          <td className="p-4 align-top">
            <Link to={`/userdetails/${customer._id}`} className="hover:text-blue-600">
              {customer.Name}
            </Link>
          </td>
          <td className="p-4 align-top">{customer.contactNo}</td>
          <td className="p-4 align-top">{customer.email}</td>
          <td className="p-4 align-top">
            <div className="flex">
              <p>
                {new Date(customer.createdAt).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
              <p className='mx-1'>&</p>
              <p>
                {new Date(customer.createdAt).toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </td>
          <td className="p-4 align-top">
            <button className="text-red-500 hover:text-red-700">
              <FaTrash />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default Users;
