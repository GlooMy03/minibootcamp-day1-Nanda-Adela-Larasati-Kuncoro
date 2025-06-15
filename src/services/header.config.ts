const baseHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('authToken') ?? ''}`,
  };
}

export { baseHeaders }