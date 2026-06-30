async function generate() {
  setLoading(true);

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, style }),
    });

    const data = await res.json();

    console.log("DATA:", data);

    setImages(data.images || []);

  } catch (err) {
    console.error(err);
    setImages([]);
  }

  setLoading(false);
}
