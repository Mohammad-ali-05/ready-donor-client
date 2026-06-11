import { GoDotFill } from "react-icons/go";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { LuCalendarDays, LuHouse } from "react-icons/lu";

const statusStyles = {
    active: "bg-green-50 text-green-600 border-green-200",
    blocked: "bg-red-50 text-red-600 border-red-200",
};

const DonorCard = ({ donor }) => {
    const statusStyle =
        statusStyles[donor?.status] ||
        "bg-base-200 text-base-content/60 border-gray-200";

    return (
        <div className="bg-base-100 border border-gray-100 rounded-lg shadow-md hover:shadow-md transition-all duration-200 p-5 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-5">
                {/* Left: avatar + identity */}
                <div className="flex items-center gap-3">
                    <img
                        src={donor?.image}
                        alt={donor?.name}
                        className="w-12 h-12 rounded-full object-cover border"
                    />

                    <div>
                        <h2 className="text-base font-semibold text-base-content">
                            {donor?.name}
                        </h2>

                        <p className="text-xs text-base-content/50">
                            {donor?.email}
                        </p>
                    </div>
                </div>

                {/* Right: status */}
                <span
                    className={`text-xs px-2 py-1 rounded-full border font-medium flex items-center gap-1 ${statusStyle}`}>
                    <GoDotFill className="text-xs" />
                    {donor?.status}
                </span>
            </div>

            {/* Body */}
            <div className="flex items-start">
                {/* Info Section */}
                <div className="space-y-4 flex-grow">
                    {/* Location */}
                    <div className="flex items-center gap-3">
                        <span>
                            <HiOutlineLocationMarker className="font-blood text-2xl text-base-content/60" />
                        </span>

                        <div>
                            <p className="text-xs text-base-content/50">
                                Location
                            </p>
                            <p className="text-sm font-medium text-base-content">
                                {donor?.districtName} · {donor?.upazilaName}
                            </p>
                        </div>
                    </div>

                    {/* Division */}
                    <div className="flex items-center gap-3">
                        <span className="font-blood text-2xl text-base-content/60">
                            <LuHouse />
                        </span>

                        <div>
                            <p className="text-xs text-base-content/50">
                                Division
                            </p>
                            <p className="text-sm font-medium text-base-content">
                                {donor?.divisionName}
                            </p>
                        </div>
                    </div>

                    {/* Joined date */}
                    <div className="flex items-center gap-3">
                        <span className="font-blood text-2xl text-base-content/60">
                            <LuCalendarDays />
                        </span>

                        <div>
                            <p className="text-xs text-base-content/50">
                                Joined
                            </p>
                            <p className="text-sm font-medium text-base-content">
                                {new Date(
                                    donor?.createdAt,
                                )?.toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Blood group highlight */}
                <div className="mb-5 flex items-center justify-between">
                    <div className="w-14 h-14 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center">
                        <span className="text-red-600 font-bold text-lg">
                            {donor?.bloodGroup}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonorCard;
