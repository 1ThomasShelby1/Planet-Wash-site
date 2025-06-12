// TotalOffers.jsx
import React from 'react';
import { useDeleteOffersMutation, useGetAllOffersQuery } from '../../redux/auth/AuthApi';
import { MdDelete } from 'react-icons/md';

const TotalOffers = () => {
  const { data: om, isLoading, error } = useGetAllOffersQuery();
  const [deleteOffer] = useDeleteOffersMutation();

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error.message}</div>;

  const approved = om?.data?.filter(o => o.status === 'approved');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 bg-white min-h-[450px] rounded-md">
      {approved?.map(offer => (
        <div
          key={offer._id}
          className="bg-white rounded-xl shadow-sm p-3 w-full max-w-xs mx-auto h-40 flex flex-col justify-between"
        >
          {/* Image section */}
          <div className="w-full h-32 rounded-md overflow-hidden">
            <img
              src={offer.image}
              alt="Offer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Button outside image, inside card */}
          <div className="flex justify-end mt-2">
            <button
              onClick={() => deleteOffer(offer._id)}
              className="bg-red-100 hover:bg-red-200 text-red-600 p-1 rounded-full shadow transition"
              title="Delete"
            >
              <MdDelete size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TotalOffers;
