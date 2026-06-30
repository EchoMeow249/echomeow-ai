{images.map((img, i) => (
  <div key={i} style={{ display: "inline-block", margin: 10 }}>
    <img src={img} width={180} />

    <br />

    <a href={img} download target="_blank">
      <button style={{ marginTop: 5 }}>
        Download
      </button>
    </a>
  </div>
))}
