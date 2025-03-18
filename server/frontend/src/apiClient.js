const apiClient = {
  get: async (url) => {
    const res = await fetch(url, { method: "GET" });
    const retobj = await res.json();
    if (retobj.status === 200) {
      return retobj;
    }

    throw retobj;
  },
};

export default apiClient;
