import { FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useGetAllUsersQuery } from '../redux/auth/AuthApi';

const Users = () => {
  const { data: allUsers } = useGetAllUsersQuery();
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-xl shadow-md font-sans h-[80vh] bg-white">
      {/* Table for md and up */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full table-auto bg-[#BDB5B530]">
          <thead className="text-[#1E1E1E]">
            <tr>
              <th className="p-3 font-[600] align-top text-start">Customer Name</th>
              <th className="p-3 font-[600] align-top text-start">Contact No</th>
              <th className="p-3 font-[600] align-top text-start">Email</th>
              <th className="p-3 font-[600] align-top text-start">Registration Date & Time</th>
              <th className="p-3 font-[600] align-top text-start">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white text-start font-[300]">
            {allUsers?.map((customer, _id) => (
              <tr key={_id} className="hover:bg-gray-50 text-[#919191] ">
                <td className="p-4 ">
                  <Link to={`/userdetails/${customer._id}`} className="hover:text-blue-600">
                    {customer.Name}
                  </Link>
                </td>
                <td className="p-4 ">{customer.contactNo}</td>
                <td className="p-4">{customer.email}</td>
                <td className="p-4">
                  <div className="flex">
                    <p>
                      {new Date(customer.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="mx-1">&</p>
                    <p>
                      {new Date(customer.createdAt).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </td>
                <td className="p-4">
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Form-style layout */}
      <div className="md:hidden space-y-4 p-3">
        {allUsers?.map((customer, id) => (
          <div key={id} className="bg-white rounded-xl p-4 shadow-sm border space-y-3 text-[#919191]">
            <div>
              <label className="block text-[#1E1E1E] font-semibold mb-1">Customer Name</label>
              <input
                type="text"
                value={customer.Name}
                onClick={() => navigate(`/userdetails/${customer._id}`)}
                className="w-full bg-gray-100 border border-gray-300 text-sm p-2 rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-[#1E1E1E] font-semibold mb-1">Contact No</label>
              <input
                type="text"
                value={customer.contactNo}
                disabled
                className="w-full bg-gray-100 border border-gray-300 text-sm p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-[#1E1E1E] font-semibold mb-1">Email</label>
              <input
                type="text"
                value={customer.email}
                disabled
                className="w-full bg-gray-100 border border-gray-300 text-sm p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-[#1E1E1E] font-semibold mb-1">Registration Date & Time</label>
              <input
                type="text"
                value={`${new Date(customer.createdAt).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })} & ${new Date(customer.createdAt).toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}`}
                disabled
                className="w-full bg-gray-100 border border-gray-300 text-sm p-2 rounded"
              />
            </div>
            <div className="text-right">
              <button className="text-red-500 hover:text-red-700">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
