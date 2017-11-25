/**
 * Converts JSON object to FormData object.
 * Note: It doesn't support nested objects at the moment.
 *
 * @param {Object} jsonData JSON Object to convert
 * @returns {Object} Form Data object
 */
export function convertJsonToFormData(jsonData) {
  const formData = new FormData()

  Object.keys(jsonData).forEach(key => {
    if (jsonData[key]) {
      formData.append(key, jsonData[key])
    }
  })

  return formData
}
