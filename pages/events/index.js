import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";
const PER_PAGE = 2;

export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map(evt => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      <Pagination page={page} total={total} perPage={PER_PAGE} />
    </Layout>
  );
}
export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate Start Page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch Total/count
  const totalRes = await fetch(`${API_URL}/articles/count`);

  const total = await totalRes.json();

  // Fetch Events
  const eventRes = await fetch(
    `${API_URL}/articles?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await eventRes.json();

  return {
    props: { events, page: +page, total },
  };
}
