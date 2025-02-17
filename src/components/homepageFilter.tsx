"use client"

import { Datepicker, Label, TextInput } from "flowbite-react"
import useToast from "@/hooks/helperToast"
import Image from "next/image"
import type React from "react"
import { useEffect, useState } from "react"
import { AUTOCOMPLETE_ENDPOINT, GEOCODER_ENDPOINT } from "@/constants/constants"
import { Listbox } from "@headlessui/react"
import { useRouter } from "next/navigation"

// import "react-day-picker/dist/style.css"

interface PetService {
  id: number
  service_name: string
  image: string
  time_type: string
}

interface Location {
  latitude: number
  longitude: number
  city: string
}

interface ModalWrapperProps {
  data: {
    services: string[]
    rating: string[]
    serviceTimes: string[]
    boardingNear: string
    startDate: Date
    endDate: Date
    days: {
      id: number
      week_day: string
    }[]
    timesSlots: string[]
    petCategory: {
      id: number
      pet_name: string
      image: string
      slug: string
    }[]
    petServices: {
      id: number
      service_name: string
      image: string
      time_type: string
    }[]
    petSizes: {
      id: number
      size: string
    }[]
  }
}

interface Prediction {
  description: string
  place_id: string
}

export default function ModalWrapper({ data }: ModalWrapperProps) {
  const router = useRouter()

  const [selectedOption, setSelectedOption] = useState<PetService | null>(data.petServices[0] || null)

  const getToday = () => new Date()
  const { showErrorToast } = useToast()

  const getTomorrow = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow
  }

  const [startDate, setStartDate] = useState<Date | null>(
    JSON.parse(localStorage.getItem("start_date") || "null")
      ? new Date(JSON.parse(localStorage.getItem("start_date") || "null"))
      : getToday(),
  )

  const [endDate, setEndDate] = useState<Date | null>(
    JSON.parse(localStorage.getItem("end_date") || "null")
      ? new Date(JSON.parse(localStorage.getItem("end_date") || "null"))
      : getTomorrow(),
  )

  const [activeTab, setActiveTab] = useState<number>(
    JSON.parse(localStorage.getItem("pet_id") || `${data.petServices[0]?.id || 0}`),
  )

  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    JSON.parse(localStorage.getItem("service_id") || "0"),
  )

  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [manualLocation, setManualLocation] = useState<Location | null>(
    JSON.parse(localStorage.getItem("location") || "null"),
  )
  const [userInput, setUserInput] = useState<string>(localStorage.getItem("city") || "")
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedDays, setSelectedDays] = useState<number[]>(JSON.parse(localStorage.getItem("weekIds") || "[]"))
  const [selectedSlots, setSelectedSlots] = useState<string[]>(JSON.parse(localStorage.getItem("slots") || "[]"))
  const [selectedSizes, setSelectedSizes] = useState<number[]>(JSON.parse(localStorage.getItem("sizes") || "[]"))

  const [selectedRating, setSelectedRating] = useState<string | null>(localStorage.getItem("rating") || "")

  const [showSlots, setShowSlots] = useState<boolean>(false)
  const [showWeeks, setShowWeeks] = useState<boolean>(false)
  const [showEndDate, setShowEndDate] = useState(false)
  const [repetition, setRepetition] = useState<string>(localStorage.getItem("repetition") || "one-time")

  useEffect(() => {
    setSelectedOption(null)
    setStartDate(getToday())
    setEndDate(getTomorrow())
    setActiveTab(data.petServices[0]?.id || 0)
    setSelectedServiceId(null)
    setPredictions([])
    setManualLocation(null)
    setUserInput("")
    setSelectedDays([])
    setSelectedSlots([])
    setSelectedSizes([])
    setSelectedRating(null)
    setShowSlots(false)
    setShowWeeks(false)
    setShowEndDate(true)

    localStorage.removeItem("start_date")
    localStorage.removeItem("end_date")
    localStorage.removeItem("pet_id")
    localStorage.removeItem("service_id")
    localStorage.removeItem("start_date")
    localStorage.removeItem("time_type")
    localStorage.removeItem("rating")
    localStorage.removeItem("city")
    localStorage.removeItem("weekIds")
    localStorage.removeItem("location")
    localStorage.removeItem("sizes")
    localStorage.removeItem("slots")
    localStorage.removeItem("repetition")  

    if (data.petServices.length > 0) {
      const initialService = data.petServices[0]
      setSelectedOption(initialService)
      handleSelectedService(data.petServices, initialService)
    }

    let savedServiceId = localStorage.getItem("service_id")

    if (!savedServiceId && data.petServices.length > 0) {
      savedServiceId = data.petServices[0].id.toString()

      localStorage.setItem("service_id", JSON.stringify(savedServiceId))
      localStorage.setItem("services", JSON.stringify(data.petServices))
    } else if (savedServiceId) {
      savedServiceId = JSON.parse(savedServiceId)
    }
    if (savedServiceId) setSelectedServiceId(savedServiceId)
    if (data.petServices[0]?.id) {
      localStorage.setItem("pet_id", JSON.stringify(data.petServices[0]?.id))
      setActiveTab(data.petServices[0]?.id)
    }
  }, [data.petServices])

  useEffect(() => {
    if (startDate) {
      localStorage.setItem("start_date", JSON.stringify(startDate))
    }
  }, [startDate])

  useEffect(() => {
    if (endDate) {
      localStorage.setItem("end_date", JSON.stringify(endDate))
    }
  }, [endDate])

  const handleStartDateChange = (date: Date | null) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (date && date >= today) {
      setStartDate(date)
      localStorage.setItem("start_date", JSON.stringify(date))
      if (endDate && date > endDate) {
        const newEndDate = new Date(date)
        newEndDate.setDate(newEndDate.getDate() + 1)
        setEndDate(newEndDate)
        localStorage.setItem("end_date", JSON.stringify(newEndDate))
      }
    }
  }

  const handleEndDateChange = (date: Date | null) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let newEndDate = date

    if (date === null) {
      newEndDate = new Date()
      newEndDate.setDate(newEndDate.getDate() + 1)
      newEndDate.setHours(0, 0, 0, 0)
    }

    if (newEndDate <= startDate) {
      showErrorToast("End date cannot be same as start date")
      return
    }
    if (startDate && newEndDate <= startDate) {
      newEndDate = new Date(startDate)
      newEndDate.setDate(startDate.getDate() + 1)
    }

    setEndDate(newEndDate)
    localStorage.setItem("end_date", JSON.stringify(newEndDate))
  }


  const handleTabChange = (id: number) => {
    setActiveTab(id)
    localStorage.setItem("pet_id", JSON.stringify(id))
  }

  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    setUserInput(input)

    if (input) {
      fetchPlacePredictions(input)
    } else {
      setPredictions([])
    }
  }

  const fetchPlacePredictions = async (input: string) => {
    const queryParams = new URLSearchParams({ name: input }).toString()

    try {
      const response = await fetch(`${AUTOCOMPLETE_ENDPOINT}?${queryParams}`)
      const data = await response.json()

      if (data.data.predictions && data.data.predictions.length > 0) {
        setPredictions(data.data.predictions)
      } else {
        setPredictions([])
      }
    } catch (error) {
      console.error("Error fetching location data: ", error)
    }
  }

  const handleSelectPrediction = (prediction: Prediction) => {
    const place = prediction.description
    setUserInput(place)
    fetchPlaceDetails(place)
  }

  const fetchPlaceDetails = async (place: string) => {
    setLoading(true)
    console.log(loading)
    try {
      const response = await fetch(GEOCODER_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: place }),
      })

      const data = await response.json()

      if (data.data.latitude && data.data.longitude) {
        const location: Location = {
          latitude: data.data.latitude,
          longitude: data.data.longitude,
          city: place || "Unknown City",
        }

        localStorage.setItem("city", place)
        localStorage.setItem(
          "location",
          JSON.stringify({ latitude: data.data.latitude, longitude: data.data.longitude }),
        )

        setManualLocation(location)
        setPredictions([])
      } else {
        console.error("No geocoding results found.")
      }
    } catch (error) {
      console.error("Error fetching geocoding data: ", error)
    } finally {
      setLoading(false)
    }
  }

  const isDayDisabled = (weekDay: string) => {
    if (!startDate || !endDate) return true

    const start = new Date(startDate)
    const end = new Date(endDate)
    const dayIndex = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(weekDay)

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      if (d.getDay() === dayIndex) {
        return false
      }
    }

    return true
  }

  const isTimeSlotDisabled = (slot: string) => {
    if (!startDate) return false

    const today = new Date()
    const isToday = startDate.toDateString() === today.toDateString()

    if (!isToday) return false

    const [timeRange] = slot.split(" - ")
    const [startTime, meridiem] = timeRange.split(" ")
    const [hours, minutes] = startTime.split(":")
    let slotStartHour = Number.parseInt(hours)

    if (meridiem === "pm" && slotStartHour !== 12) {
      slotStartHour += 12
    } else if (meridiem === "am" && slotStartHour === 12) {
      slotStartHour = 0
    }

    const currentHour = today.getHours()
    const currentMinute = today.getMinutes()

    if (currentHour < slotStartHour || (currentHour === slotStartHour && currentMinute < Number.parseInt(minutes))) {
      return false
    }

    const slotRangeHours = 6
    const slotEndHour = (slotStartHour + slotRangeHours) % 24

    if (currentHour >= slotStartHour && (slotEndHour > slotStartHour ? currentHour < slotEndHour : currentHour <= 23)) {
      return false
    }

    return true
  }

  const handleSelectedService = (petServices: PetService[], selectedService: PetService) => {
    localStorage.setItem("services", JSON.stringify(petServices))
    localStorage.setItem("service_id", JSON.stringify(selectedService.id))
    setSelectedServiceId(selectedService.id.toString())
    setSelectedOption(selectedService)
    if (selectedService.time_type === "visit") {
      localStorage.setItem("repetition", "one-time")
      localStorage.setItem("time_type", "visit")
      setRepetition("one-time")
      setShowEndDate(false)
      setShowSlots(true)
    } else {
      localStorage.removeItem("repetition")
      localStorage.setItem("time_type", "night")
      setRepetition("repetition")
      setShowSlots(false)
      setShowEndDate(true)
    }
  }

  const handleRating = (rating: string) => {
    if (localStorage.getItem("rating")) {
      localStorage.removeItem("rating")
      setSelectedRating("")
    } else {
      localStorage.setItem("rating", rating)
      setSelectedRating(rating)
    }
  }

  const handleRepetition = (repetition: string | number) => {
    localStorage.setItem("repetition", JSON.stringify(repetition))

    if (repetition == "repeat") {
      setRepetition("repetition")
      setShowWeeks(true)
      setShowEndDate(true)
    } else {
      setRepetition("one-time")
      setShowWeeks(false)
      setShowEndDate(false)
    }
  }

  const handleWeeks = (weekId: number) => {
    const newSelectedDays = [...selectedDays]

    if (newSelectedDays.includes(weekId)) {
      const index = newSelectedDays.indexOf(weekId)
      newSelectedDays.splice(index, 1)
    } else {
      newSelectedDays.push(weekId)
    }

    setSelectedDays(newSelectedDays)
    localStorage.setItem("weekIds", JSON.stringify(newSelectedDays))
  }

  const handleSlotsTimes = (slots: string) => {
    if (isTimeSlotDisabled(slots)) {
      showErrorToast("This time slot is not available.")
      return
    }

    const newSelectedSlots = [...selectedSlots]

    if (newSelectedSlots.includes(slots)) {
      const index = newSelectedSlots.indexOf(slots)
      newSelectedSlots.splice(index, 1)
    } else {
      newSelectedSlots.push(slots)
    }

    setSelectedSlots(newSelectedSlots)
    localStorage.setItem("slots", JSON.stringify(newSelectedSlots))
  }

  const handlePetSizes = (sizes: number) => {
    const newSelectedSizes = [...selectedSizes]

    if (newSelectedSizes.includes(sizes)) {
      const index = newSelectedSizes.indexOf(sizes)
      newSelectedSizes.splice(index, 1)
    } else {
      newSelectedSizes.push(sizes)
    }

    setSelectedSizes(newSelectedSizes)
    localStorage.setItem("sizes", JSON.stringify(newSelectedSizes))
  }

  const handleSearch = () => {
    if (!selectedServiceId) {
      showErrorToast("Please select a pet service before searching.")
      return
    }

    const filterData = {
      startDate,
      endDate,
      location: manualLocation,
      selectedDays,
      selectedSlots,
      selectedSizes,
      selectedRating,
      selectedPet: activeTab,
      selectedRepetition: localStorage.getItem("repetition") || "one-time",
    }

    window.dispatchEvent(new CustomEvent("filterApplied", { detail: filterData }))
    router.push("/search")
  }

  const clearInput = () => {
    setUserInput("")
    setPredictions([])
    localStorage.removeItem("location")
    localStorage.removeItem("city")
  }

  return (
    <>
      <div className="homepage_from_section_top_area">
        <div className="tabs flex flex-nowrap home_form_tab_area">
          {data.petCategory.map((category) => (
            <button
              key={category.id}
              className={`tab-button2 ${activeTab == category.id ? "active" : ""}`}
              onClick={() => handleTabChange(category.id)}
            >
              {category.pet_name}
              <Image src={category.image || "/placeholder.svg"} alt={category.pet_name} width={50} height={30} />
            </button>
          ))}
        </div>
      </div>

      <div className="tab-contents">
        <div id="tab-2" className="tab-content2 active">
          <div className="home_form">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="col-span-2 mt-4">
                <Label htmlFor="services" value="Service" />

                <div className="w-full mt-2">
                  <Listbox
                    value={selectedOption}
                    onChange={(option) => {
                      setSelectedOption(option)
                      const selectedService = data.petServices.find((service) => service.id === option.id)
                      if (selectedService) {
                        handleSelectedService(data.petServices, selectedService)
                      }
                    }}
                  >
                    <div className="relative">
                      <Listbox.Button className="w-full px-4 py-2 text-left bg-gray-50 border border-gray-300 rounded-md cursor-pointer flex items-center justify-between focus:outline-none focus:ring-2 focus:[#0C3C4A]">
                        <span>{selectedOption?.service_name}</span>
                        <i className="fa-solid fa-angle-down"></i>
                      </Listbox.Button>

                      <Listbox.Options className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                        {data.petServices.map((option) => (
                          <Listbox.Option
                            key={option.id}
                            value={option}
                            className={({ active, selected }) =>
                              `cursor-pointer select-none px-4 py-2 ${active ? "bg-[#0C3C4A] text-white" : selected ? "bg-gray-100" : "text-gray-900"
                              }`
                            }
                          >
                            {option.service_name}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  </Listbox>
                </div>
              </div>

              <div className="col-span-2 mt-4">
                <Label htmlFor="ratings" value="Rating" />
                <div className="rating-group">
                  {data.rating.map((rating) => (
                    <div key={rating} className="flex">
                      <input
                        type="radio"
                        id={`rating-${rating}`}
                        className="rating-radio"
                        name="rating"
                        value={rating}
                        checked={selectedRating == rating}
                        onClick={() => handleRating(rating)}
                      />
                      <label htmlFor={`rating-${rating}`} className="rating-label">
                        {rating}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {showSlots && (
                <div className="col-span-2">
                  <Label htmlFor="service-time" value="How often do you need this service?" />
                  <div className="rating-group">
                    <input
                      type="radio"
                      onClick={() => handleRepetition("one-time")}
                      id="oneTime"
                      className="rating-radio"
                      name="time"
                      checked={repetition == "one-time"}
                    />
                    <label htmlFor="oneTime" className="rating-label2">
                      One Time
                    </label>

                    <input
                      type="radio"
                      onClick={() => handleRepetition("repeat")}
                      id="repeatWeekly"
                      className="rating-radio"
                      name="time"
                      checked={repetition == "repetition"}
                    />
                    <label htmlFor="repeatWeekly" className="rating-label2">
                      Repeat Weekly
                    </label>
                  </div>
                </div>
              )}

              <div className="col-span-2">
                <Label htmlFor="boardingNear" value="Boarding near" />
                <div className="relative">
                  <TextInput
                    id="boardingNear"
                    type="text"
                    sizing="md"
                    className="mt-2"
                    value={userInput || ""}
                    placeholder="Write your place to search"
                    onChange={handleManualInput}
                  />

                  {userInput.length > 0 && (
                    <div
                      onClick={clearInput}
                      className="absolute right-2 bottom-3 w-5 h-5 bg-primary rounded-full text-center text-white cursor-pointer text-base/5"
                    >
                      x
                    </div>
                  )}
                </div>
                <div className="location_search">
                  {predictions?.length > 0 && userInput?.length > 0 && (
                    <div className="suggestion_box">
                      {predictions.map((prediction, index) => (
                        <div
                          key={index}
                          className="suggestion"
                          onClick={() => handleSelectPrediction(prediction)}
                        >
                          <p>{prediction?.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>


              </div>

              <div className="col-span-2 sm:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startDate">Start Date</label>
                    <Datepicker
                      id="startDate"
                      value={startDate}
                      onChange={handleStartDateChange}
                      minDate={new Date()}
                      className="mt-2"
                      showTodayButton={false}
                      showClearButton={false}
                      placeholder="Select a start date"
                    />
                  </div>
                  {showEndDate && (
                    <div>
                      <label htmlFor="endDate">End Date</label>
                      <Datepicker
                        id="endDate"
                        value={endDate}
                        onChange={handleEndDateChange}
                        minDate={startDate || new Date()}
                        className="mt-2"
                        showTodayButton={false}
                        showClearButton={false}
                        placeholder="Select an end date"
                      />
                    </div>
                  )}
                </div>
              </div>

              {showSlots && showWeeks && repetition == "repetition" && (
                <div className="col-span-2">
                  <Label htmlFor="selectDay" value="Select day" />
                  <div className="rating-group">
                    {data.days.map((day) => (
                      <div key={day.id} className="flex">
                        <input
                          type="checkbox"
                          id={`day-${day.id}`}
                          className="rating-radio"
                          name="day"
                          value={day.id}
                          checked={selectedDays.includes(day.id)}
                          onChange={() => handleWeeks(day.id)}
                          disabled={isDayDisabled(day.week_day)}
                        />
                        <label
                          htmlFor={`day-${day.id}`}
                          className={`rating-label relative ${isDayDisabled(day.week_day)
                            ? 'opacity-50 cursor-not-allowed hover:before:content-[\'\'] hover:before:absolute hover:before:inset-0 hover:before:bg-[url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4" y1="4" x2="20" y2="20"/></svg>\')] hover:before:bg-no-repeat hover:before:bg-center hover:before:opacity-50'
                            : "hover:bg-gray-100"
                            }`}
                        >
                          {day.week_day}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {showSlots && (
                <div className="col-span-2">
                  <Label htmlFor="whichTime" value="Which time(s) do you need?" />
                  <div className="rating-group">
                    {data.timesSlots.map((time) => (
                      <div key={time} className="flex">
                        <input
                          type="checkbox"
                          id={`time-${time}`}
                          className="rating-radio"
                          name="whichTime"
                          value={time}
                          checked={selectedSlots.includes(time)}
                          disabled={isTimeSlotDisabled(time)}
                        />
                        <label htmlFor={`time-${time}`} className="rating-label" onClick={() => handleSlotsTimes(time)}>
                          {time}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="homepage_from_section_bottom_area_area">
            <div className="w-full">
              <Label htmlFor="petsDetail" value="Pets detail" />
              <div className="rating-group">
                {data.petSizes.map((petsizes) => (
                  <div key={petsizes.id} className="flex">
                    <input
                      type="checkbox"
                      id={`petsDetail-${petsizes.id}`}
                      className="rating-radio"
                      name="petsDetail"
                      checked={selectedSizes.includes(petsizes.id)}
                      onChange={() => handlePetSizes(petsizes.id)}
                    />
                    <label htmlFor={`petsDetail-${petsizes.id}`} className="rating-label">
                      {petsizes.size}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full mt-4 text-center">
              <button onClick={handleSearch} className="but_style1">
                Search Sitters
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

