      <br /><br />

      <button onClick={generate}>
        {loading ? "Generating..." : "Generate"}
      </button>

      <div style={{ marginTop: 20 }}>
        {images.map((img, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <img src={img} width={180} />
            <br />
            <a href={img} target="_blank" rel="noopener noreferrer">
              Download
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
