"use client";

import { FC } from "react";
import { IUser } from "@/types";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

export interface MembershipPDFApplicant extends IUser {
  accountName: string;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1F2933",
  },
  header: {
    backgroundColor: "#14532D",
    padding: 24,
    borderBottomWidth: 4,
    borderBottomColor: "#D4A72C",
  },
  organization: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    letterSpacing: 1,
  },
  subtitle: {
    color: "#F5E8B4",
    fontSize: 9,
    textAlign: "center",
    marginTop: 5,
  },
  // The magic happens here: fixed replicates it on every page
  watermarkContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1, // Places it safely behind the text content
  },
  watermarkImage: {
    width: 280,
    opacity: 0.1, // Keeps the watermark subtle and legible
  },
  container: {
    paddingHorizontal: 36,
    paddingVertical: 30,
    flexGrow: 1,
  },
  title: {
    color: "#14532D",
    fontSize: 15,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 5,
  },
  intro: {
    color: "#647067",
    textAlign: "center",
    fontSize: 9,
    marginBottom: 20,
  },
  sectionTitle: {
    backgroundColor: "#E8F3EC",
    color: "#14532D",
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    padding: 8,
    marginVertical: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  field: {
    width: "50%",
    paddingRight: 10,
    marginBottom: 13,
  },
  label: {
    color: "#647067",
    fontSize: 8,
    marginBottom: 4,
  },
  value: {
    fontSize: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#D9E2DA",
  },
  fullField: {
    width: "100%",
    paddingRight: 10,
    marginBottom: 13,
  },
  declaration: {
    fontSize: 10,
    lineHeight: 1.5,
    marginBottom: 4,
  },
  signature: {
    width: "30%",
    borderTopWidth: 1,
    borderTopColor: "#1F2933",
    paddingTop: 7,
    fontSize: 9,
    textAlign: "center",
    color: "#647067",
    position: "absolute",
    bottom: 24,
    right: 34,
  },
});

const MembershipPDF: FC<MembershipPDFApplicant> = (applicant) => {
  return (
    <Document
      title="Anirban Business Fund Membership Application"
      author="Anirban Business Fund"
      subject="Membership Application"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.organization}>ANIRBAN BUSINESS FUND</Text>
          <Text style={styles.subtitle}>ANIRBAN ORGANIZATION</Text>
        </View>

        {/* Watermark Section */}
        <View fixed style={styles.watermarkContainer}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image src="/logos/anirban-logo.png" style={styles.watermarkImage} />
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>MEMBERSHIP APPLICATION</Text>
          <Text style={styles.intro}>
            Please review your information and complete the required fields.
          </Text>

          <Text style={{ position: "absolute", right: 30, marginTop: -20 }}>
            Date: __ __ / __ __ / __ __ __ __
          </Text>

          <Text style={styles.declaration}>
            Anirban Business Fund is founded on the principles of regular
            savings, mutual trust, and collective growth. Our primary objective
            is to build a strong financial foundation consistent monthly
            contributions, enabling members to support one another when needed
            and work together toward a more secure and prosperous future.
          </Text>
          <Text style={styles.declaration}>
            Our long-term vision is to invest our collective savings in
            profitable and sustainable business ventures, where every member can
            participate as a stakeholder and share in the opportunities for
            growth and success.
          </Text>
          <Text style={styles.declaration}>
            We believe that through financial discipline, transparency,
            cooperation, and a shared commitment to our goals, Anirban Business
            Fund can build lasting value for its members and create a stronger
            financial future for everyone involved.
          </Text>

          <Text style={{ textAlign: "right", marginTop: 10 }}>
            Applicator: {applicant.username}{" "}
          </Text>

          <Text style={styles.sectionTitle}>PERSONAL INFORMATION</Text>
          <View style={styles.grid}>
            <Field label="Full Name" value={applicant.fullName} />
            <Field
              label="Gender"
              value={applicant.gender.toLocaleUpperCase()}
            />

            <Field label="NID / Birth ID" value="" />
            <Field
              label="Date of Birth"
              value={
                applicant.dateOfBirth
                  ? new Date(applicant.dateOfBirth).toLocaleDateString("en-GB")
                  : " "
              }
            />

            <Field
              label="Blood Group"
              value={
                applicant.blood.toLowerCase() === "unknown"
                  ? " "
                  : applicant.blood
              }
            />
            <Field
              label="Nationality"
              value={applicant.nationality.toLocaleUpperCase()}
            />

            <Field label="Email Address" value={applicant.email} />
            <Field label="Phone Number" value={applicant.number} />

            <Field
              label="Residential Address"
              value={applicant.address ?? ""}
              full
            />
          </View>

          <Text style={styles.sectionTitle}>PREFERRED ACCOUNT NAME</Text>
          <Field label="Requested Name" value={applicant.accountName} full />

          <Text style={styles.sectionTitle}>APPLICANT DECLARATION</Text>
          <Text style={styles.declaration}>
            I hereby declare that all information provided in this application
            is true and accurate to the best of my knowledge. If any information
            is found to be false or inaccurate, I agree to abide by the decision
            of the Committee. Furthermore, I undertake to comply with all rules,
            regulations, and policies of the Anirban Business Fund.
          </Text>

          <Text style={styles.signature}>Applicant&apos;s Signature</Text>
        </View>
      </Page>
    </Document>
  );
};

export default MembershipPDF;

type IField = {
  label: string;
  value: string;
  full?: boolean;
};
const Field: FC<IField> = ({ label, value, full = false }) => {
  return (
    <View style={full ? styles.fullField : styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || " "}</Text>
    </View>
  );
};
