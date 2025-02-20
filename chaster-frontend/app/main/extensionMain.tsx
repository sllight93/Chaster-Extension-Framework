import React from "react";

interface DataProps {
  data: any;
}

export default function ExtensionMain({ data }: DataProps) {
  const votesToday = data.sampleConf.data.votes.today;
  const dailyQuota = data.sampleConf.config.daily_quota;
  const progressPercentage = Math.round((votesToday / dailyQuota) * 100);
  const linkUrl = data.sampleConf.link || "https://example.com";

  return (
    <div>
      {/* Fortschrittstext oberhalb der Leiste */}
      <div className="progress-text">
        {votesToday} / {dailyQuota}
      </div>
      
      {/* Fortschrittsleiste */}
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${progressPercentage}%` }}
          aria-valuenow={votesToday}
          aria-valuemin={0}
          aria-valuemax={dailyQuota}
        ></div>
      </div>

        <hr></hr>

      {/* Link im Stil eines Input-Textfeldes – klick zum Kopieren */}
      <input 
        type="text"
        className="form-control clickable-copy"
        value={linkUrl}
        readOnly
        onClick={() => {
          navigator.clipboard.writeText(linkUrl);
        }}
      />
    </div>
  );
}