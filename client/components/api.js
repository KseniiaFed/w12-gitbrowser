/**
 * Request questions from the backend.
 */

export const getClinicsData = async () => {
  const clinics = await fetch(
    'https://kf26hhwnj8.execute-api.eu-west-1.amazonaws.com/fedorovak/clinics',
    {
      method: 'GET',
      headers: {
        'x-api-key': 'PFbNaRl06n6vwGjTXbMq23WevaheA00C7e9lOMmG',
        'Content-Type': 'application/json'
      }
    }
  )
  return clinics.json()
}

export const getServicesData = async () => {
  const services = await fetch(
    'https://kf26hhwnj8.execute-api.eu-west-1.amazonaws.com/fedorovak/services',
    {
      method: 'GET',
      headers: {
        'x-api-key': 'PFbNaRl06n6vwGjTXbMq23WevaheA00C7e9lOMmG',
        'Content-Type': 'application/json'
      }
    }
  )
  return services.json()
}

export const getCustomersData = async () => {
  const customers = await fetch(
    'https://kf26hhwnj8.execute-api.eu-west-1.amazonaws.com/fedorovak/clinics',
    {
      method: 'GET',
      headers: {
        'x-api-key': 'PFbNaRl06n6vwGjTXbMq23WevaheA00C7e9lOMmG',
        'Content-Type': 'application/json'
      }
    }
  )
  return customers.json()
}
