async function generate() {
  setLoading(true);

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-secret": "my-secret-123",
      },
      body: JSON.stringify({ prompt, style }),
    });

    const data = await res.json();

    console.log("STATUS:", res.status);
    console.log("DATA:", data);

    if (!res.ok) {
      alert(data.error || "Error");
      setImages([]);
      return;
    }

    // IMPORTANT FIX HERE
    if (data.images && Array.isArray(data.images)) {
      setImages([...data.images]);
    } else {
      setImages([]);
    }

  } catch (err) {
    console.error(err);
    setImages([]);
  }

  setLoading(false);
}
