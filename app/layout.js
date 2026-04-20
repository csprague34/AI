export const metadata = {
  title: 'Falconry Quiz',
  description: 'Test your knowledge of the ancient art of falconry',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Georgia, serif', background: '#1a1208' }}>
        {children}
      </body>
    </html>
  );
}
