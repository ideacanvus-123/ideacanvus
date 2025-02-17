'use client';
import { useState, useEffect } from 'react';
import { Label, TextInput, Modal, Radio } from 'flowbite-react';
import Cookies from 'js-cookie';
import {
  AUTOCOMPLETE_ENDPOINT,
  GEOCODER_ENDPOINT,
  PLACE_DETAILS_ENDPOINT,
} from '@/constants/constants';
import { LoaderSpinner } from '@/components/loader';

interface Prediction {
  description: string;
  place_id: string;
}

interface Location {
  latitude: number;
  longitude: number;
  address: string;
  zip_code: number;
}

export default function ModalWrapper() {
  const [openModal, setOpenModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [userInput, setUserInput] = useState('');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [selectedCity, setSelectedCity] = useState('New York, USA');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedLocation = Cookies.get('location');
    if (savedLocation) {
      const parsedLocation: Location = JSON.parse(savedLocation);
      setSelectedCity(parsedLocation.address || 'Unknown City');
    } else {
      setOpenModal(true);
      fetchDefaultLocation();
    }
  }, []);

  const fetchDefaultLocation = async () => {
    console.log(currentLocation)
    setLoading(true);
    try {
      const response = await fetch('https://ipapi.co/json/');
      if (!response.ok) throw new Error('Failed to fetch IP location.');
      const data = await response.json();

      const address = `${data.city}${data.region ? ', ' + data.region : ''}, ${data.country_name}`;
      const location: Location = {
        latitude: data.latitude,
        longitude: data.longitude,
        address,
        zip_code: data.postal || 0,
      };
      setCurrentLocation(location);
      setSelectedCity(address);
      
      Cookies.set('location', JSON.stringify(location), { expires: 100 });
    } catch (error) {
      console.error('Error fetching default location:', error);
      handleFallbackLocation();
    } finally {
      setLoading(false);
    }
  };

  const handleFallbackLocation = () => {
    const fallbackLocation: Location = {
      latitude: 40.7128,
      longitude: -74.0060,
      address: 'New York, USA',
      zip_code: 0,
    };
    setCurrentLocation(fallbackLocation);
    setSelectedCity(fallbackLocation.address);
    Cookies.set('location', JSON.stringify(fallbackLocation), { expires: 100 });
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser. Using default location.');
      fetchDefaultLocation();
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await fetchAddressPlaceDetails(latitude, longitude);
      },
      (error) => {
        console.error('Error fetching location: ', error.message);
        alert('Unable to fetch location. Using default location.');
        fetchDefaultLocation();
      }
    );
  };

  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUserInput(input);

    if (input) {
      fetchPlacePredictions(input);
    } else {
      setPredictions([]);
    }
  };

  const fetchPlacePredictions = async (input: string) => {
    try {
      const queryParams = new URLSearchParams({ name: input }).toString();
      const response = await fetch(`${AUTOCOMPLETE_ENDPOINT}?${queryParams}`);
      const data = await response.json();

      setPredictions(data.data.predictions || []);
    } catch (error) {
      console.error('Error fetching location data:', error);
      setPredictions([]);
    }
  };

  const handleSelectPrediction = (prediction: Prediction) => {
    fetchPlaceDetails(prediction.description);
  };

  const fetchPlaceDetails = async (place: string) => {
    setLoading(true);
    try {
      const response = await fetch(GEOCODER_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: place }),
      });
      const data = await response.json();

      if (data.data.latitude && data.data.longitude) {
        const location: Location = {
          latitude: data.data.latitude,
          longitude: data.data.longitude,
          address: place,
          zip_code: data.data.geoResponse.zipcode || 0,
        };
        window.location.reload();
        setCurrentLocation(location);
        window.location.reload();
        Cookies.set('location', JSON.stringify(location), { expires: 100 });
        setSelectedCity(place);
        setPredictions([]);
        setOpenModal(false);
        
      } else {
        console.error('No geocoding results found.');
      }
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAddressPlaceDetails = async (latitude: number, longitude: number) => {
    setLoading(true);
    try {
      const response = await fetch(PLACE_DETAILS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude, longitude }),
      });
      const data = await response.json();

      if (data.data.address) {
        const location: Location = {
          latitude,
          longitude,
          address: data.data.address,
          zip_code: data.data.geoResponse.zipcode || 0,
        };
        setCurrentLocation(location);
        window.location.reload();
        Cookies.set('location', JSON.stringify(location), { expires: 100 });
        setSelectedCity(data.data.address);
        setOpenModal(false);
        window.location.reload();
      } else {
        console.error('No geocoding results found.');
      }
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setOpenModal(true)} className="modal_but">
        <i className="fa-solid fa-location-dot" /> {selectedCity}
      </button>

      <Modal show={openModal} onClose={() => setOpenModal(false)} size="md">
        <Modal.Header className="py-2 close_but">Add Location</Modal.Header>
        <Modal.Body>
          {loading && <LoaderSpinner />}
          <TextInput
            id="manual-location"
            type="text"
            className="mt-2 mb-2"
            value={userInput}
            onChange={handleManualInput}
            placeholder="Enter manually"
            disabled={loading}
            autoComplete="off"
          />
          <div className="location_search">
            <div className="flex items-center gap-2 mt-4">
              <Radio id="current-location" name="location" onClick={getCurrentLocation} className='hidden' />
              <Label htmlFor="current-location">
              <i className="fa-solid fa-location-crosshairs"></i> Use my current location
              </Label>
            </div>

            {predictions.length > 0 && !loading && (
              <div className="suggestion_box">
                {predictions.map((prediction, index) => (
                  <div
                    key={index}
                    className="suggestion"
                    onClick={() => handleSelectPrediction(prediction)}
                  >
                    <p>{prediction.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
