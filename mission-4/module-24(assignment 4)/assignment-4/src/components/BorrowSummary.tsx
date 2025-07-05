import { useGetBorrowSummaryQuery } from "../api/borrowApi";

export default function BorrowSummary() {
  const { data: summary, isLoading } = useGetBorrowSummaryQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Book Title</th>
            <th className="px-4 py-2 border">ISBN</th>
            <th className="px-4 py-2 border">Total Quantity Borrowed</th>
          </tr>
        </thead>
        <tbody>
          {summary?.map((item) => (
            <tr key={item.bookId}>
              <td className="px-4 py-2 border">{item.title}</td>
              <td className="px-4 py-2 border">{item.isbn}</td>
              <td className="px-4 py-2 border">{item.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
