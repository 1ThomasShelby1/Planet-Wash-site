import React, { useState, useRef } from 'react';
import {
  useGetAllOffersQuery,
  useApproveOfferMutation,
  useRejectOfferMutation,
  useOfferAddedByAdminMutation,
} from '../redux/auth/AuthApi';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Add_Offer = () => {

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const fileRef = useRef();

  const { data: Om, isLoading, error } = useGetAllOffersQuery();
  const [addOffer, { isLoading: adding }] = useOfferAddedByAdminMutation();
  const [approveOffer, { isLoading: approving }] = useApproveOfferMutation();
  const [rejectOffer, { isLoading: rejecting }] = useRejectOfferMutation();


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const goToTotalOffers = () => navigate('/totaloffers');

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    console.log(file);

    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();


    formData.append('image', selectedFile);
    console.log("FormData contents:", Object.fromEntries(formData.entries()));
    try {
      console.log(formData);

      await addOffer(formData).unwrap();
      console.log('Offer added successfully');
      setIsModalOpen(false);
      setPreview(null);
      setSelectedFile(null);
    } catch (err) {
      console.error('Add offer failed', err);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveOffer(id).unwrap();
    } catch (err) {
      console.error('Approve failed:', err);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectOffer(id).unwrap();
    } catch (err) {
      console.error('Reject failed:', err);
    }
  };

  return (
    <div className="max-w-sm md:max-w-6xl mx-auto space-y-4 font-sans relative ">
      {/* Header */}
      <div className="bg-white border rounded-xl shadow-sm p-3 flex flex-col sm:flex-row items-start sm:items-center ">
        <h2 className="text-xl  flex-1 font-[600]">Total Requests</h2>
        <div className="relative flex gap-4 mt-2 sm:mt-0">
          {/* Add Offer button */}
          <button
            onClick={() => setIsModalOpen(prev => !prev)}
            className="bg-[#087FB9] text-white rounded-md px-5 py-2 font-[400]"
          >
            Add Offer
          </button>

          {/* Inline Modal Popup */}
          {isModalOpen && (
            <div className="absolute top-full mt-2 right-32 w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-lg z-10">
              <div className="p-4 relative">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setPreview(null);
                    setSelectedFile(null);
                  }}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>

                <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center overflow-hidden">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 flex flex-col items-center">
                      {/* React Icon */}
                      <AiOutlineCloudUpload className="w-8 h-8 mb-2 text-gray-300" />
                      Upload Photo
                    </span>
                  )}
                </div>

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <button
                  onClick={() => fileRef.current?.click()}
                  className="mt-4 w-full bg-green-400 text-white rounded-lg py-2 hover:bg-green-500 transition"
                >
                  Select Photo
                </button>

                {preview && (
                  <button
                    onClick={handleUpload}
                    disabled={adding}
                    className="mt-2 w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition"
                  >
                    {adding ? 'Uploading...' : 'Upload Photo'}
                  </button>
                )}
              </div>
            </div>
          )}

          <button
            onClick={goToTotalOffers}
            className="bg-[#087FB9] text-white rounded-md px-5 py-2">
            Total Offers
          </button>
        </div>
      </div>

      {/* Offers Table */}
      <div className="bg-white border rounded-xl shadow-sm p-3">
        <table className="min-w-[720px] w-full text-sm text-left text-slate-500 border">
          <thead className="bg-gray-100 text-center font-[600]">
            <tr>
              <th>Photo</th>
              <th>Shop Name</th>
              <th>Contact</th>
              <th>Address</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
         <tbody className="font-[500]">
  {Om?.data?.map(txn => (
    <tr key={txn._id} className="hover:bg-gray-50 align-middle">
      <td className="px-4 py-3 text-center align-middle">
        <img
          src={txn.image}
          alt=""
          className="w-20 h-16 object-cover rounded bg-slate-300 mx-auto"
        />
      </td>
      <td className="px-4 py-3 text-center align-middle">{txn.shopId?.shopName || '-'}</td>
      <td className="px-4 py-3 text-center align-middle">{txn.shopId?.contactNo || '-'}</td>
      <td className="px-4 py-3 text-center align-middle">{txn.shopId?.address || '-'}</td>
      <td className="px-4 py-3 text-center align-middle">
        <div className="flex justify-center gap-2">
          <button
            onClick={() => handleApprove(txn._id)}
            disabled={approving}
            className="bg-[#399703] text-white px-4 py-1 rounded-sm"
          >
            {approving ? 'Approving...' : 'Approve'}
          </button>
          <button
            onClick={() => handleReject(txn._id)}
            disabled={rejecting}
            className="bg-[#F10505] text-white px-4 py-1 rounded-sm"
          >
            {rejecting ? 'Rejecting...' : 'Reject'}
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default Add_Offer;
