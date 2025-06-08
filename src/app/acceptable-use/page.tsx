
"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AcceptableUsePolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Acceptable Use Policy</CardTitle>
            <CardDescription>Last updated: {new Date().toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>This Acceptable Use Policy ("AUP") governs your use of the ConnectWell platform and services ("Services"). By using our Services, you agree to this AUP.</p>
            
            <h2 className="text-xl font-semibold text-foreground pt-4">Prohibited Activities</h2>
            <p>You may not use the Services to engage in, foster, or promote illegal, abusive, or irresponsible behavior, including but not limited to:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>Unauthorized access to or use of data, systems, or networks, including any attempt to probe, scan or test the vulnerability of a system or network or to breach security or authentication measures without express authorization of the owner of the system or network.</li>
              <li>Monitoring data or traffic on any network or system without the express authorization of the owner of the system or network.</li>
              <li>Interference with service to any user, host, or network including, without limitation, mail bombing, flooding, deliberate attempts to overload a system, and broadcast attacks.</li>
              <li>Use of an Internet account or computer without the owner's authorization.</li>
              <li>Collecting or using email addresses, screen names or other identifiers without the consent of the person identified (including, without limitation, phishing, Internet scamming, password robbery, spidering, and harvesting).</li>
              <li>Distributing software that covertly gathers or transmits information about a user.</li>
              <li>Distributing advertisement delivery software unless: (i) the user affirmatively consents to the download and installation of such software based on a clear and conspicuous notice of the nature of the software, and (ii) the software is easily removable by use of standard tools for such purpose included on major operating systems.</li>
              <li>Any conduct that is likely to result in retaliation against the ConnectWell network or website, or ConnectWell's employees, officers or other agents, including engaging in behavior that results in any server being the target of a denial of service attack (DoS).</li>
              <li>Posting or transmitting any content that is harassing, libelous, defamatory, abusive, threatening, harmful, vulgar, obscene, or otherwise objectionable.</li>
              <li>Posting or transmitting any content that infringes the intellectual property rights or other proprietary rights of any third party.</li>
              <li>Using the Services for any fraudulent or illegal purpose.</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground pt-4">Medical Information</h2>
            <p>ConnectWell is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on the ConnectWell platform.</p>

            <h2 className="text-xl font-semibold text-foreground pt-4">Enforcement</h2>
            <p>We reserve the right, but do not assume the obligation, to investigate any violation of this AUP or misuse of the Services. We may: investigate violations and work with law enforcement if criminal activity is suspected; remove, block, filter, or restrict by any other means any materials that we deem appropriate; suspend or terminate your access to the Services for any AUP violation.</p>
            
            <h2 className="text-xl font-semibold text-foreground pt-4">Changes to this Policy</h2>
            <p>We may revise this AUP from time to time. You are responsible for checking this page regularly for any changes. Your continued use of the Services after changes to the AUP are posted will be considered acceptance of those changes.</p>

            <h2 className="text-xl font-semibold text-foreground pt-4">Contact Us</h2>
            <p>If you have any questions about this Acceptable Use Policy, please contact us at support@connectwell.example.com.</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
