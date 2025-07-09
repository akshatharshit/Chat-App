import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Edit, Trash, Phone } from "lucide-react";
import { useContactStore } from "../store/useContactStore";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";


const ContactList = () => {
    const { contacts, getContacts, deleteContact, sendEmailToCreator } = useContactStore();
    const { authUser } = useAuthStore();

    const [search, setSearch] = useState("");

    useEffect(() => {
        getContacts();
    }, []);

    const filteredContacts = contacts.filter((c) =>
        c.username.toLowerCase().includes(search.toLowerCase())
    );

    const clearSearch = () => setSearch("");
    const navigate = useNavigate();


    return (
        <div className="p-4 flex flex-col gap-6 mt-20">
            {/* Top controls */}
            <div className="flex justify-center items-center flex-wrap gap-32 px-[60px]">
                {/* Left: Fill Contact Info */}
                <Link to="/fill-contact" className="btn btn-md btn-secondary">
                    Fill Contact Info
                </Link>

                {/* Right: Search bar */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search by username"
                        className="input input-md input-bordered"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        onClick={clearSearch}
                        className="btn btn-md btn-outline"
                        disabled={!search}
                    >
                        Clear
                    </button>
                </div>
            </div>




            {/* Contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 mt-6">
                {filteredContacts.map((contact) => (
                    <div key={contact._id} className="card bg-base-200 shadow-md p-4">
                        <div className="card-body p-0">
                            <h2 className="card-title">{contact.username}</h2>
                            <p><span className="font-semibold">Mobile:</span> {contact.mobile}</p>
                            <p><span className="font-semibold">Occupation:</span> {contact.occupation || "N/A"}</p>
                            <p><span className="font-semibold">Description:</span> {contact.description || "N/A"}</p>
                            <p><span className="font-semibold">Work Done:</span> {contact.workDone}</p>
                            <p><span className="font-semibold">Created:</span> {new Date(contact.createdAt).toLocaleString()}</p>

                            {/* Availability */}
                            <p className="mt-2">
                                {contact.isAvailable ? (
                                    <span className="badge badge-success">Available for Volunteer</span>
                                ) : (
                                    <span className="badge badge-neutral">Not Available</span>
                                )}
                            </p>

                            {/* Actions */}
                            <div className="flex gap-2 mt-4 flex-wrap">
                                {contact.isAvailable && (
                                    <button
                                        onClick={() => navigate(`/contacts/email/${contact._id}`)}
                                        className="btn btn-sm btn-accent"
                                    >
                                        <Mail className="w-4 h-4" />
                                        Email
                                    </button>
                                )}

                                {authUser?._id === contact.createdBy?._id && (
                                    <>
                                        <Link
                                            to={`/contacts/edit/${contact._id}`}
                                            className="btn btn-sm btn-info"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Edit
                                        </Link>



                                        {contact.isAvailable && (
                                            <a
                                                href={`tel:${contact.mobile}`}
                                                className="btn btn-sm btn-primary flex block lg:hidden"
                                            >
                                                <Phone className="w-4 h-4" />
                                                Call
                                            </a>
                                        )}




                                        <button
                                            onClick={() => deleteContact(contact._id)}
                                            className="btn btn-sm btn-error"
                                        >
                                            <Trash className="w-4 h-4" />
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredContacts.length === 0 && (
                <div className="text-center text-gray-500 mt-10">
                    No contacts found.
                </div>
            )}
        </div>
    );
};

export default ContactList;
