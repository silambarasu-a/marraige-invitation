import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import SaveTheDate from "@/components/SaveTheDate";
import EventCard from "@/components/EventCard";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";
import HeartRain from "@/components/HeartRain";
import SectionBurst from "@/components/SectionBurst";
import InvitationShell from "@/components/InvitationShell";
import { ReceptionArtwork } from "@/components/Artwork";
import MuhurthamScene from "@/components/MuhurthamScene";

export default function Home() {
  return (
    <InvitationShell>
      <main className="relative">
        <HeartRain count={26} />
        <SectionBurst />

        <Hero />

        <Countdown />

        <SaveTheDate />

        <EventCard
          id="reception"
          eyebrow="Day 1 · 24 / 05 / 2026 · Sunday"
          title="Reception"
          weekday="Sunday"
          day="24"
          month="May"
          year="2026"
          time="6:30 PM Onwards"
          venue="Sri Krishna Ganam Thirumana Madapam"
          location="Udumalpet"
          themeTagline="An evening of celebration"
          mapsUrl="https://maps.google.com/?q=Sri+Krishna+Ganam+Thirumana+Madapam+Udumalpet"
          embedSrc="https://www.google.com/maps?q=Sri+Krishna+Ganam+Thirumana+Madapam+Udumalpet&output=embed"
          artwork={<ReceptionArtwork />}
          theme="night"
        />

        <Timeline
          date="24 May 2026"
          weekday="Sunday"
          items={[
            { time: "6:30 PM", title: "Guests Arrival", subtitle: "Welcome drinks & mingling" },
            { time: "7:30 PM", title: "Reception Ceremony", subtitle: "Blessings from elders" },
            { time: "8:30 PM", title: "Dinner", subtitle: "A feast to remember" },
            { time: "10:00 PM", title: "Cake & Closing", subtitle: "Sweet endings" },
          ]}
        />

        <EventCard
          id="muhurtham"
          eyebrow="Day 2 · 25 / 05 / 2026 · Monday"
          title="Muhurtham"
          weekday="Monday"
          day="25"
          month="May"
          year="2026"
          time="9:00 AM Onwards"
          venue="Alagu Nachiamman Temple"
          location="Pollachi"
          themeTagline="Sacred vows · eternal bond"
          mapsUrl="https://maps.google.com/?q=Alagu+Nachiamman+Temple+Pollachi"
          embedSrc="https://www.google.com/maps?q=Alagu+Nachiamman+Temple+Pollachi&output=embed"
          artwork={<MuhurthamScene />}
          theme="day"
        />

        <Timeline
          date="25 May 2026"
          weekday="Monday"
          items={[
            { time: "8:30 AM", title: "Guests Arrival", subtitle: "Tea & traditional welcome" },
            { time: "9:00 AM", title: "Muhurtham", subtitle: "The sacred ceremony" },
            { time: "11:30 AM", title: "Aashirvad", subtitle: "Blessings from elders" },
            { time: "12:30 PM", title: "Lunch", subtitle: "Traditional South Indian feast" },
          ]}
        />

        <Footer />
      </main>
    </InvitationShell>
  );
}
