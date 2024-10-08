import multiavatar from "@multiavatar/multiavatar/esm";
export default function MultiAvatar({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const avatar = multiavatar(name);
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: avatar }} />
  );
}