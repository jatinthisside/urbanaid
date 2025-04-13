import { Star, ThumbsUp, MapPin, ExternalLink, CheckCircle } from "lucide-react"
import { Card } from "@/components/ui/card"

interface VendorCardProps {
  name: string
  profession: string
  rating: number
  reviews: number
  location: string
  hourlyRate: number
  isVerified?: boolean
  profileImage: string
}

export default function VendorCard({
  name,
  profession,
  rating,
  reviews,
  location,
  hourlyRate,
  isVerified = false,
  profileImage,
}: VendorCardProps) {
  return (
    <Card className="w-[20rem] rounded-xl overflow-hidden shadow-lg relative">
      {/* Header background */}
      <div className="h-28 bg-blue-200"></div>

      {/* Verified badge */}
      {isVerified && (
        <div className="absolute top-4 right-4 bg-white rounded-full flex items-center py-1 px-2 text-xs font-medium shadow-sm">
          <CheckCircle className="w-3 h-3 text-blue-600" />
          <span className="text-gray-800 ml-1">Verified Pro</span>
        </div>
      )}

      {/* Profile image */}
      <div className="absolute top-12 left-6 opacity-5">
        <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-white bg-amber-300">
          <img src={profileImage || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Content */}
      <div className="pt-12 pb-6 bg-white px-i-24 flex flex-col gap-y-1">
        <h3 className="text-base font-medium text-gray-900">{name}</h3>
        <p className="text-xs font-light">{profession}</p>

        <div className="flex items-center gap-4 mt-i-10">
          <div className="flex items-center gap-1 bg-primary-50 rounded-md px-i-10 py-i-4">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-[10px] font-medium ml-1">{rating}</span>
          </div>

          <div className="flex items-center gap-1">
            <ThumbsUp className="w-3 h-3 text-gray-500" />
            <span className="text-[10px] text-gray-500 font-light ml-1">{reviews} reviews</span>
          </div>

          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-gray-500" />
            <span className="text-[10px] text-gray-500 font-light ml-1">{location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-i-10 mb-i-20 mt-i-lg">
          <p className="text-[10px] font-light text-gray-700">Starting at ${hourlyRate}/hr</p>
          <a href="#" className="text-[10px] font-medium text-blue-600 flex items-center hover:text-blue-800">
            View Profile
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </div>
      </div>
    </Card>
  )
}
