/**
 * Layout pages publiques — pas de header/footer ici car chaque page
 * inclut ses propres Navbar et Footer pour la flexibilité
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
