export default function UserField({
  name,
  qNum,
  result,
  description,
  detials,
  parts,
}) {
  return (
    <div className="grid grid-cols-6 text-center gap-4 text-[#71778E] py-3 border-b border-gray-200 hover:bg-gray-50">
      <div>{name}</div>
      <div>{qNum}</div>
      <div>{result}</div>
      <div>{description}</div>
      <div>{detials}</div>
      <div>{parts}</div>
    </div>
  );
}
