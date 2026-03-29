import "../styles/footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          Made with <span className="heart">🤍</span> by Team TodFodCoders · {currentYear}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
